document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLightbox();
    initTableOfContents();
    initSearch();
    initMobileMenu();
});

function initTheme() {
    const themeBtn = document.querySelector('.main-header__btn-toggle-theme');
    const htmlTag = document.documentElement;
    
    if (!themeBtn) return;
    const themeIcon = themeBtn.querySelector('i');

    const currentTheme = localStorage.getItem('theme') || 'latte';
    htmlTag.setAttribute('data-theme', currentTheme);
    updateIcon(currentTheme);

    themeBtn.addEventListener('click', () => {
        const theme = htmlTag.getAttribute('data-theme');
        const newTheme = (theme === 'mocha') ? 'latte' : 'mocha';
        
        htmlTag.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        if (!themeIcon) return;
        if (theme === 'latte') {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    }
}

function initLightbox() {
    const overlay = document.getElementById('lightbox-overlay');
    if (!overlay) return; // Không có lightbox thì dừng luôn

    const lightboxImg = document.getElementById('lightbox-img');
    const captionText = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const triggers = document.querySelectorAll('.lightbox-trigger');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            overlay.style.display = "flex";
            lightboxImg.src = this.href;
            const caption = this.getAttribute('data-caption');
            captionText.innerHTML = caption ? caption : "";
        });
    });

    const closeLightbox = () => {
        overlay.style.display = "none";
        lightboxImg.src = "";
    };

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && overlay.style.display === "flex") {
            closeLightbox();
        }
    });
}

function initTableOfContents() {
    const toc = document.querySelector('#TableOfContents');
    const content = document.querySelector('.main-content__article-body-content');

    if (!toc || !content) return;

    const headers = content.querySelectorAll('h2, h3, h4');
    const tocLinks = toc.querySelectorAll('a');
    
    if (headers.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80% 0px', 
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                if (!id) return;

                const activeLink = toc.querySelector(`a[href="#${id}"]`);

                if (activeLink) {
                    tocLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.parentElement) {
                            link.parentElement.classList.remove('active'); 
                            link.parentElement.classList.remove('open');
                        }
                    });

                    activeLink.classList.add('active');
                    if (activeLink.parentElement) {
                        activeLink.parentElement.classList.add('active');
                    }

                    const parentUl = activeLink.closest('ul');
                    if (parentUl && parentUl.parentElement.tagName === 'LI') {
                        parentUl.parentElement.classList.add('open');
                    }
                }
            }
        });
    }, observerOptions);

    headers.forEach(header => observer.observe(header));
}

function initSearch() {
    const searchInput = document.querySelector('.main-header__search-box');
    const searchResults = document.getElementById('main_header__search-results');
    
    if (!searchInput || !searchResults) return;

    let fuse; 
    let isDataLoaded = false;

    const loadSearchData = async () => {
        if (isDataLoaded) return;
        
        try {
            const response = await fetch('/index.json');
            const data = await response.json();

            const options = {
                keys: ['title', 'contents', 'categories'],
                threshold: 0.4,
                ignoreLocation: true,
                minMatchCharLength: 2
            };
            
            fuse = new Fuse(data, options);
            isDataLoaded = true;
        } catch (error) {
            console.error("Error loading index.json:", error);
        }
    };

    searchInput.addEventListener('focus', loadSearchData);

    searchInput.addEventListener('input', function(e) {
        if (!isDataLoaded || !fuse) return;

        const query = e.target.value.trim();
        searchResults.innerHTML = '';

        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }

        const results = fuse.search(query);

        if (results.length > 0) {
            searchResults.style.display = 'block';
            
            const uniqueTitles = new Set();
            for (const result of results) {
                const item = result.item;

                if (uniqueTitles.has(item.title)) {
                    continue; 
                }

                uniqueTitles.add(item.title);
                const li = document.createElement('li');
                li.innerHTML = `
                    <a href="${item.permalink}">
                        <span class="main-header__search-item-title">${item.title}</span>
                    </a>
                `;
                searchResults.appendChild(li);
            }

        } else {
            searchResults.style.display = 'block';
            searchResults.innerHTML = `
                <li style="padding: 15px; text-align: center; color: var(--ctp-subtext0);">
                    No results found.
                </li>`;
        }
    });

    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

function initMobileMenu() {
    const btn = document.querySelector('.main-header__btn-mobile-bar');
    const menu = document.getElementById('main-header-mobile-menu');
    if (!btn || !menu) return;

    const close = () => {
        menu.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
    };

    btn.addEventListener('click', () => {
        const open = !menu.hasAttribute('hidden');
        open ? close() : (menu.removeAttribute('hidden'), btn.setAttribute('aria-expanded', 'true'));
    });

    // click link trong menu => đóng
    menu.addEventListener('click', (e) => {
        if (e.target.closest('a')) close();
    });

    // click ra ngoài / ESC => đóng
    document.addEventListener('click', (e) => {
        if (menu.hasAttribute('hidden')) return;
        if (btn.contains(e.target) || menu.contains(e.target)) return;
        close();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
    });

    // resize lên >=768 => đóng cho khỏi kẹt state
    const mq = window.matchMedia('(min-width: 768px)');
    mq.addEventListener?.('change', (ev) => { if (ev.matches) close(); });
}