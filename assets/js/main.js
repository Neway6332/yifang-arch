/* ============================================
   Yifang Architectural Design
   Main JavaScript - Navigation, Animations, Modal
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Mobile Menu Toggle --- */
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const navOverlay = document.querySelector('.nav-overlay');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      nav.classList.toggle('open');
      if (navOverlay) navOverlay.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on overlay click
    if (navOverlay) {
      navOverlay.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('open');
        navOverlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    // Close menu on nav link click
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('open');
        if (navOverlay) navOverlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- Scroll Reveal Animation --- */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* --- Header Scroll Effect --- */
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
    } else {
      header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
    }
    
    lastScroll = currentScroll;
  });

  /* --- Portfolio Filtering --- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterBtns.length && portfolioItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        portfolioItems.forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  /* --- Project Modal --- */
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalClose = document.querySelector('.modal-close');
  const modalImage = document.querySelector('.modal-image');
  const modalBody = document.querySelector('.modal-body');

  // Sample project data for modal display
  const projectData = {
    '1': {
      title: '云麓山庄',
      titleEn: 'Yunlu Mountain Villa',
      category: 'architecture',
      categoryLabel: '建筑设计',
      categoryLabelEn: 'Architecture',
      year: '2025',
      desc: '一个坐落于山间的度假别墅项目，设计充分尊重自然地形，将建筑融入山林景观之中。采用当地石材和木材为主要建材，打造与自然和谐共生的居住体验。',
      descEn: 'A mountain resort villa project that respects the natural terrain, blending architecture into the mountain landscape. Using local stone and wood as primary materials, creating a harmonious living experience with nature.',
      location: '广东，深圳',
      locationEn: 'Shenzhen, Guangdong',
      image: '/assets/images/projects/project-1.jpg'
    },
    '2': {
      title: '城市艺术中心',
      titleEn: 'City Art Center',
      category: 'architecture',
      categoryLabel: '建筑设计',
      categoryLabelEn: 'Architecture',
      year: '2024',
      desc: '一个现代化的文化艺术综合体，流畅的线条和通透的玻璃幕墙创造出开放、包容的空间氛围。建筑本身即成为城市的一道风景线。',
      descEn: 'A modern cultural and art complex, with flowing lines and transparent glass curtain walls creating an open, inclusive spatial atmosphere. The building itself becomes a landmark.',
      location: '广东，深圳',
      locationEn: 'Shenzhen, Guangdong',
      image: '/assets/images/projects/project-2.jpg'
    },
    '3': {
      title: '湖畔住宅',
      titleEn: 'Lakeside Residence',
      category: 'architecture',
      categoryLabel: '建筑设计',
      categoryLabelEn: 'Architecture',
      year: '2025',
      desc: '临湖而建的私人住宅，大面积落地窗将湖景引入室内，室内外空间相互渗透。简约现代的设计语言与自然环境形成对话。',
      descEn: 'A private residence built by the lake, with large floor-to-ceiling windows bringing the lake view indoors. Simple modern design language dialogues with the natural environment.',
      location: '浙江，杭州',
      locationEn: 'Hangzhou, Zhejiang',
      image: '/assets/images/projects/project-3.jpg'
    },
    '4': {
      title: '企业总部',
      titleEn: 'Corporate Headquarters',
      category: 'architecture',
      categoryLabel: '建筑设计',
      categoryLabelEn: 'Architecture',
      year: '2024',
      desc: '一个高效节能的办公建筑，采用绿色建筑策略，包含屋顶花园、自然通风系统和太阳能光伏板。',
      descEn: 'An energy-efficient office building employing green building strategies including rooftop gardens, natural ventilation systems, and solar panels.',
      location: '广东，深圳',
      locationEn: 'Shenzhen, Guangdong',
      image: '/assets/images/projects/project-4.jpg'
    },
    '5': {
      title: '精品酒店室内',
      titleEn: 'Boutique Hotel Interior',
      category: 'interior',
      categoryLabel: '室内设计',
      categoryLabelEn: 'Interior',
      year: '2025',
      desc: '精品酒店的室内设计，融合当地文化元素与现代奢华，创造独特的入住体验。',
      descEn: 'Boutique hotel interior design blending local cultural elements with modern luxury, creating a unique guest experience.',
      location: '云南，大理',
      locationEn: 'Dali, Yunnan',
      image: '/assets/images/projects/project-5.jpg'
    },
    '6': {
      title: '商业空间设计',
      titleEn: 'Commercial Space Design',
      category: 'interior',
      categoryLabel: '室内设计',
      categoryLabelEn: 'Interior',
      year: '2024',
      desc: '高端商业空间的整体室内设计，强调品牌体验和空间流动性。',
      descEn: 'Comprehensive interior design for high-end commercial space, emphasizing brand experience and spatial fluidity.',
      location: '广东，深圳',
      locationEn: 'Shenzhen, Guangdong',
      image: '/assets/images/projects/project-6.jpg'
    },
    '7': {
      title: '滨水城市设计',
      titleEn: 'Waterfront Urban Design',
      category: 'planning',
      categoryLabel: '规划设计',
      categoryLabelEn: 'Planning',
      year: '2025',
      desc: '滨水地区的城市设计总体规划，打造活力公共空间和生态廊道。',
      descEn: 'Master plan for a waterfront urban area, creating vibrant public spaces and ecological corridors.',
      location: '广东，广州',
      locationEn: 'Guangzhou, Guangdong',
      image: '/assets/images/projects/project-7.jpg'
    },
    '8': {
      title: '社区公园景观',
      titleEn: 'Community Park Landscape',
      category: 'landscape',
      categoryLabel: '景观设计',
      categoryLabelEn: 'Landscape',
      year: '2024',
      desc: '社区公园景观设计，创造多功能户外活动空间和自然体验区。',
      descEn: 'Community park landscape design creating multi-functional outdoor activity spaces and nature experience zones.',
      location: '广东，深圳',
      locationEn: 'Shenzhen, Guangdong',
      image: '/assets/images/projects/project-8.jpg'
    },
    '9': {
      title: '文化街区更新',
      titleEn: 'Cultural District Renewal',
      category: 'planning',
      categoryLabel: '规划设计',
      categoryLabelEn: 'Planning',
      year: '2025',
      desc: '历史街区的保护性更新规划，保留原有肌理的同时注入现代城市活力。',
      descEn: 'Conservation renewal planning for a historic district, preserving original fabric while injecting modern urban vitality.',
      location: '广东，深圳',
      locationEn: 'Shenzhen, Guangdong',
      image: '/assets/images/projects/project-9.jpg'
    }
  };

  function openModal(projectId) {
    if (!modalOverlay || !modalBody) return;
    
    const proj = projectData[projectId];
    if (!proj) return;

    const lang = i18n ? i18n.currentLang : 'zh';
    const title = lang === 'en' ? proj.titleEn : proj.title;
    const desc = lang === 'en' ? proj.descEn : proj.desc;
    const catLabel = lang === 'en' ? proj.categoryLabelEn : proj.categoryLabel;
    const location = lang === 'en' ? proj.locationEn : proj.location;

    modalImage.src = proj.image;
    modalImage.alt = title;
    modalImage.onerror = function() {
      this.src = '';
      this.classList.add('placeholder-img');
      this.style.height = '400px';
    };
    modalImage.onload = function() {
      this.classList.remove('placeholder-img');
    };

    modalBody.innerHTML = `
      <h2>${title}</h2>
      <div class="category">${catLabel} | ${proj.year} | ${location}</div>
      <p>${desc}</p>
    `;

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Attach modal open events to portfolio items
  document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
      const id = item.dataset.projectId;
      if (id) openModal(id);
    });
  });

  // Attach modal open events to project cards on home page
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.projectId;
      if (id) openModal(id);
    });
  });

  // Modal close events
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  /* --- Re-bind portfolio modals on language change --- */
  document.addEventListener('languageChanged', () => {
    // Re-open modal with new language if modal is open
    if (modalOverlay && modalOverlay.classList.contains('open')) {
      const activeItem = document.querySelector('.portfolio-item.active');
      // Modal stays open, content updates via the translations
    }
  });

  /* --- Active Navigation Highlight --- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    }
  });

  /* --- Smooth Anchor Scrolling --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  console.log('Yifang Architectural Design — Site initialized');
});
