/* ============================================
   Yifang Architectural Design
   Internationalization Engine (i18n)
   ============================================ */

const i18n = {
  currentLang: 'zh',

  translations: {},

  async init() {
    // Load saved language preference
    const saved = localStorage.getItem('yifang-lang');
    if (saved === 'en' || saved === 'zh') {
      this.currentLang = saved;
    }
    
    // Load translations for current language
    await this.loadTranslations(this.currentLang);
    
    // Apply translations to DOM
    this.applyTranslations();
    
    // Update language switcher UI
    this.updateSwitcher();
  },

  async loadTranslations(lang) {
    // Built-in translations (we'll use these for static content)
    // In production with Decap CMS, translations can be loaded from JSON files
    try {
      const response = await fetch(`/assets/lang/${lang}.json`);
      if (response.ok) {
        this.translations = await response.json();
        return;
      }
    } catch (e) {
      // Fall back to embedded translations
    }
    this.translations = this.getDefaultTranslations(lang);
  },

  getDefaultTranslations(lang) {
    if (lang === 'en') {
      return {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.services': 'Services',
        'nav.portfolio': 'Portfolio',
        'nav.news': 'News',
        'nav.contact': 'Contact',
        
        // Home
        'hero.badge': 'Yifang Architectural Design',
        'hero.title': 'Architecture in Harmony<br>with Nature & Culture',
        'hero.subtitle': 'Architecture | Interior | Planning | Landscape Design & Consulting',
        'hero.cta.portfolio': 'View Projects',
        'hero.cta.contact': 'Contact Us',
        'hero.scroll': 'Scroll',
        
        'section.featured.title': 'Featured Projects',
        'section.featured.subtitle': 'Selected Works',
        'section.featured.all': 'View All Projects',
        
        'section.services.title': 'Our Services',
        'section.services.subtitle': 'What We Do',
        'service.architecture.title': 'Architectural Design',
        'service.architecture.desc': 'Comprehensive architectural design solutions spanning residential, commercial, cultural, and public buildings, blending innovation with functionality.',
        'service.interior.title': 'Interior Design',
        'service.interior.desc': 'Creating inspiring interior spaces that harmonize aesthetics, ergonomics, and brand identity for diverse environments.',
        'service.planning.title': 'Planning & Landscape',
        'service.planning.desc': 'Strategic urban planning and landscape design that respect ecological balance and enhance quality of life.',
        'service.consulting.title': 'Design Consulting',
        'service.consulting.desc': 'Professional advisory services covering feasibility studies, design review, project management, and technical guidance.',
        
        'section.about.title': 'About Yifang',
        'section.about.subtitle': 'Our Philosophy',
        'about.preview.text': 'Shenzhen Yifang Architectural Design Co., Ltd. is a professional design firm integrating architecture, interior, planning, and landscape design. With a team of experienced architects and designers, we are committed to creating timeless architectural works that respect context, culture, and the natural environment.',
        'about.cta': 'Learn More',
        'about.philosophy.title': 'Design Philosophy',
        'about.philosophy.subtitle': 'Our Values',
        
        'section.news.title': 'Latest News',
        'section.news.subtitle': 'Stay Updated',
        'news.view': 'View All',
        
        // About Page
        'about.page.title': 'About Us',
        'about.page.desc': 'Discover our story, philosophy, and team',
        'about.intro.p1': 'Shenzhen Yifang Architectural Design Co., Ltd. is a distinguished architectural design firm dedicated to creating exceptional built environments. We integrate architectural design, interior design, urban planning, landscape design, and consulting services to deliver holistic solutions.',
        'about.intro.p2': 'Founded by a group of passionate architects and designers, Yifang has grown into a comprehensive design practice with a diverse portfolio spanning residential, commercial, cultural, educational, and urban design projects across China.',
        'about.intro.p3': 'Our approach is rooted in the belief that great architecture emerges from a deep understanding of context — the physical, cultural, and environmental factors that shape each unique project. We strive to create spaces that inspire, endure, and contribute positively to their communities.',
        
        'philosophy.innovation.title': 'Innovation',
        'philosophy.innovation.desc': 'Pushing boundaries through creative design thinking and cutting-edge technology.',
        'philosophy.context.title': 'Context',
        'philosophy.context.desc': 'Deep respect for site, culture, and environment in every design decision.',
        'philosophy.craftsmanship.title': 'Craftsmanship',
        'philosophy.craftsmanship.desc': 'Meticulous attention to detail and commitment to design excellence.',
        
        'team.title': 'Our Team',
        'team.subtitle': 'Meet the Architects & Designers',
        
        // Services Page
        'services.page.title': 'Our Services',
        'services.page.desc': 'Comprehensive design solutions for every project',
        'service.architecture.full': 'We provide full-cycle architectural design services, from conceptual design and schematic design to construction documentation and site supervision. Our expertise covers residential, commercial, cultural, educational, and mixed-use developments.',
        'service.interior.full': 'Our interior design team creates captivating spatial experiences for commercial, hospitality, residential, and office environments. We integrate furniture design, material selection, lighting design, and branding into cohesive interior solutions.',
        'service.planning.full': 'Our planning and landscape practice offers master planning, urban design, streetscape design, public realm design, and ecological restoration. We create sustainable, livable environments that connect people with nature.',
        'service.consulting.full': 'We provide design consulting services including feasibility studies, site analysis, design brief development, design review, and construction supervision. Our experienced team offers objective, expert guidance at every project stage.',
        'service.detail.label1': 'Concept Design',
        'service.detail.label2': 'Schematic Design',
        'service.detail.label3': 'Design Development',
        'service.detail.label4': 'Construction Documents',
        'service.detail.label5': 'Site Supervision',
        
        // Portfolio Page
        'portfolio.page.title': 'Portfolio',
        'portfolio.page.desc': 'Explore our featured projects',
        'portfolio.filter.all': 'All',
        'portfolio.filter.architecture': 'Architecture',
        'portfolio.filter.interior': 'Interior',
        'portfolio.filter.planning': 'Planning',
        'portfolio.filter.landscape': 'Landscape',
        'portfolio.view': 'View Project',
        
        // News Page
        'news.page.title': 'News',
        'news.page.desc': 'Company news and industry insights',
        
        // Contact Page
        'contact.page.title': 'Contact Us',
        'contact.page.desc': 'Get in touch for your next project',
        'contact.address.title': 'Office Address',
        'contact.phone.title': 'Phone',
        'contact.email.title': 'Email',
        'contact.hours.title': 'Business Hours',
        'contact.hours.text': 'Monday — Friday, 9:00 AM — 6:00 PM',
        'contact.form.title': 'Send Us a Message',
        'contact.form.name': 'Your Name',
        'contact.form.email': 'Your Email',
        'contact.form.subject': 'Subject',
        'contact.form.message': 'Your Message',
        'contact.form.submit': 'Send Message',
        'contact.form.placeholder.name': 'Enter your name',
        'contact.form.placeholder.email': 'Enter your email',
        'contact.form.placeholder.subject': 'How can we help?',
        'contact.form.placeholder.message': 'Tell us about your project...',
        
        // Footer
        'footer.desc': 'A professional architectural design firm dedicated to creating timeless built environments through innovative design and meticulous craftsmanship.',
        'footer.nav.title': 'Navigation',
        'footer.services.title': 'Services',
        'footer.contact.title': 'Contact',
        'footer.copyright': '© 2026 Shenzhen Yifang Architectural Design Co., Ltd. All rights reserved.',
        
        // Placeholder
        'placeholder.image': 'Image placeholder'
      };
    }
    
    // Default: Chinese
    return {
      // Navigation
      'nav.home': '首页',
      'nav.about': '关于我们',
      'nav.services': '服务范围',
      'nav.portfolio': '项目案例',
      'nav.news': '新闻动态',
      'nav.contact': '联系我们',
      
      // Home
      'hero.badge': '深圳市异方建筑设计有限公司',
      'hero.title': '建筑与自然文化<br>和谐共生',
      'hero.subtitle': '建筑设计 | 室内设计 | 规划景观 | 方案设计咨询',
      'hero.cta.portfolio': '查看项目',
      'hero.cta.contact': '联系我们',
      'hero.scroll': '向下滚动',
      
      'section.featured.title': '精选项目',
      'section.featured.subtitle': '代表作品',
      'section.featured.all': '查看全部项目',
      
      'section.services.title': '服务范围',
      'section.services.subtitle': '我们的专业领域',
      'service.architecture.title': '建筑设计',
      'service.architecture.desc': '涵盖住宅、商业、文化、公共建筑等领域的综合建筑设计解决方案，融合创新与功能。',
      'service.interior.title': '室内设计',
      'service.interior.desc': '创造激发灵感的室内空间，将美学、人体工程学与品牌形象和谐统一。',
      'service.planning.title': '规划景观',
      'service.planning.desc': '尊重生态平衡、提升生活品质的战略性城市规划和景观设计。',
      'service.consulting.title': '设计咨询',
      'service.consulting.desc': '涵盖可行性研究、设计评审、项目管理和技术指导的专业咨询服务。',
      
      'section.about.title': '关于异方',
      'section.about.subtitle': '设计理念',
      'about.preview.text': '深圳市异方建筑设计有限公司是一家集建筑、室内、规划景观及方案设计咨询于一体的专业设计机构。我们拥有一支经验丰富的建筑师和设计师团队，致力于创造尊重场地、文化和自然环境的永恒建筑作品。',
      'about.cta': '了解更多',
      'about.philosophy.title': '设计哲学',
      'about.philosophy.subtitle': '我们的理念',
      
      'section.news.title': '最新动态',
      'section.news.subtitle': '公司资讯',
      'news.view': '查看全部',
      
      // About Page
      'about.page.title': '关于我们',
      'about.page.desc': '了解我们的故事、理念与团队',
      'about.intro.p1': '深圳市异方建筑设计有限公司是一家卓越的建筑设计机构，致力于创造非凡的建筑环境。我们整合建筑设计、室内设计、城市规划、景观设计及咨询服务，提供全方位的设计解决方案。',
      'about.intro.p2': '由一群充满热情的建筑师和设计师创立，异方已发展成为一个综合性设计事务所，项目涵盖住宅、商业、文化、教育和城市设计等多个领域，遍布全国各地。',
      'about.intro.p3': '我们的设计方法根植于这样一个信念：伟大的建筑源自对场地的深刻理解——每个独特项目所对应的物理、文化和环境因素。我们致力于创造能够激发灵感、经久耐用、并对社区产生积极影响的空间。',
      
      'philosophy.innovation.title': '创新',
      'philosophy.innovation.desc': '通过创造性设计思维和前沿技术不断突破边界。',
      'philosophy.context.title': '文脉',
      'philosophy.context.desc': '在每一个设计决策中，深刻尊重场地、文化和环境。',
      'philosophy.craftsmanship.title': '匠心',
      'philosophy.craftsmanship.desc': '对细节的极致关注和对设计卓越的不懈追求。',
      
      'team.title': '我们的团队',
      'team.subtitle': '认识我们的建筑师与设计师',
      
      // Services Page
      'services.page.title': '服务范围',
      'services.page.desc': '为每个项目提供全面的设计解决方案',
      'service.architecture.full': '我们提供全周期的建筑设计服务，从概念设计、方案设计到施工图设计和现场监理。我们的专业覆盖住宅、商业、文化、教育和混合用途开发项目。',
      'service.interior.full': '我们的室内设计团队为商业、酒店、住宅和办公空间创造令人沉浸的空间体验。我们将家具设计、材料选择、灯光设计和品牌形象融入统一的室内解决方案。',
      'service.planning.full': '我们的规划和景观业务提供总体规划、城市设计、街道景观设计、公共空间设计和生态修复。我们创造可持续、宜居的环境，让人与自然紧密相连。',
      'service.consulting.full': '我们提供设计咨询服务，包括可行性研究、场地分析、设计任务书编制、设计评审和施工监理。我们经验丰富的团队在每个项目阶段提供客观、专业的指导。',
      'service.detail.label1': '概念设计',
      'service.detail.label2': '方案设计',
      'service.detail.label3': '深化设计',
      'service.detail.label4': '施工图设计',
      'service.detail.label5': '现场监理',
      
      // Portfolio Page
      'portfolio.page.title': '项目案例',
      'portfolio.page.desc': '探索我们的精选作品',
      'portfolio.filter.all': '全部',
      'portfolio.filter.architecture': '建筑设计',
      'portfolio.filter.interior': '室内设计',
      'portfolio.filter.planning': '规划设计',
      'portfolio.filter.landscape': '景观设计',
      'portfolio.view': '查看项目',
      
      // News Page
      'news.page.title': '新闻动态',
      'news.page.desc': '公司新闻与行业资讯',
      
      // Contact Page
      'contact.page.title': '联系我们',
      'contact.page.desc': '为您的下一个项目联系我们',
      'contact.address.title': '办公地址',
      'contact.phone.title': '电话',
      'contact.email.title': '邮箱',
      'contact.hours.title': '工作时间',
      'contact.hours.text': '周一至周五，上午 9:00 — 下午 6:00',
      'contact.form.title': '给我们留言',
      'contact.form.name': '您的姓名',
      'contact.form.email': '您的邮箱',
      'contact.form.subject': '主题',
      'contact.form.message': '您的留言',
      'contact.form.submit': '发送消息',
      'contact.form.placeholder.name': '请输入姓名',
      'contact.form.placeholder.email': '请输入邮箱',
      'contact.form.placeholder.subject': '我们能帮您什么？',
      'contact.form.placeholder.message': '请告诉我们您的项目...',
      
      // Footer
      'footer.desc': '一家专业的建筑设计机构，致力于通过创新设计和精湛工艺创造永恒的建成环境。',
      'footer.nav.title': '快速导航',
      'footer.services.title': '服务项目',
      'footer.contact.title': '联系方式',
      'footer.copyright': '© 2026 深圳市异方建筑设计有限公司 版权所有',
      
      // Placeholder
      'placeholder.image': '图片占位'
    };
  },

  applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (this.translations[key]) {
        el.innerHTML = this.translations[key];
      }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (this.translations[key]) {
        el.placeholder = this.translations[key];
      }
    });

    // Update html lang attribute
    document.documentElement.lang = this.currentLang === 'zh' ? 'zh-CN' : 'en';
    
    // Dispatch event for other scripts
    document.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { lang: this.currentLang } 
    }));
  },

  updateSwitcher() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
    });
  },

  async switchLang(lang) {
    if (lang === this.currentLang) return;
    
    this.currentLang = lang;
    localStorage.setItem('yifang-lang', lang);
    
    await this.loadTranslations(lang);
    this.applyTranslations();
    this.updateSwitcher();
  },

  t(key) {
    return this.translations[key] || key;
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => i18n.init());
