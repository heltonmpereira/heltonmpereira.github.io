document.addEventListener("alpine:init", () => {
  Alpine.data("valenPage", () => ({
    whatsappNumber: "5511971058091",
    slide: 0,
    carouselTimer: null,
    isMouseOverCarousel: false,
    touchStart: 0,
    scrolled: false,
    menuOpen: false,
    isNavigating: false,
    quote: { name: "", plan: "", situation: "" },
    navItems: [
      { label: "Início", href: "#inicio" },
      { label: "Cotação", href: "#cotacao" },
      { label: "Benefícios", href: "#beneficios" },
      { label: "Por que ter", href: "#importancia" },
      { label: "Operadoras", href: "#operadoras" },
      { label: "Sobre", href: "#sobre" },
      { label: "Avaliações", href: "#avaliacoes" },
    ],
    operatorBrands: [
      { name: "Bradesco Saúde", logo: "assets/company/bradescoSaude.png" },
      { name: "SulAmérica", logo: "assets/company/sulamerica.png" },
      { name: "Porto Saúde", logo: "assets/company/portoSaude.png" },
      { name: "Amil", logo: "assets/company/amil.png" },
    ],
    slides: [
      {
        type: "Plano individual",
        title: "Sua saúde merece",
        emphasis: "o melhor cuidado.",
        copy: "Escolha uma cobertura que acompanhe o seu ritmo, seus planos e cada nova fase.",
        cta: "Cotar plano individual",
        message: "Olá! Quero uma cotação para plano de saúde individual.",
        image: "assets/hero-individualC.jpg",
        alt: "Mulher sorrindo em casa",
      },
      {
        type: "Plano familiar",
        title: "Sua família",
        emphasis: "merece o melhor.",
        copy: "Cuidado para toda a família, com opções pensadas para a rotina e o orçamento de vocês.",
        cta: "Cotar plano familiar",
        message: "Olá! Quero uma cotação para plano de saúde familiar.",
        image: "assets/hero-familiarC.jpg",
        alt: "Família reunida em casa",
      },
      {
        type: "Plano empresarial",
        title: "Valorize quem",
        emphasis: "faz a diferença.",
        copy: "Valorize sua equipe com um benefício que ajuda a atrair talentos e fortalece sua empresa.",
        cta: "Cotar plano empresarial",
        message: "Olá! Quero uma cotação para plano de saúde empresarial.",
        image: "assets/hero-empresarialC.jpg",
        alt: "Equipe reunida em um escritório",
      },
    ],
    benefits: [
      { icon: "⌖", title: "Cobertura onde importa", copy: "Opções para sua cidade, viagens pelo Brasil e, conforme o produto, assistência no exterior." },
      { icon: "◇", title: "Escolha sem confusão", copy: "Traduzimos carências, coparticipação e rede credenciada em uma conversa simples." },
      { icon: "→", title: "Preço bem comparado", copy: "Analisamos alternativas entre operadoras para encontrar um custo-benefício coerente." },
    ],
    reasons: [
      { title: "Mais previsibilidade", copy: "Planeje o cuidado da sua saúde sem depender apenas da disponibilidade da rede pública." },
      { title: "Rede à sua escolha", copy: "Compare hospitais, clínicas e laboratórios relevantes para sua rotina antes de contratar." },
      { title: "Cuidado contínuo", copy: "Tenha um caminho mais claro para consultas, exames e acompanhamento preventivo." },
    ],
    operators: [
      { name: "SulAmérica", color: "text-[#7A1F2B]", title: "Tradição e amplitude", items: ["Diferentes categorias de rede", "Programas de saúde e bem-estar", "Opções com cobertura nacional"] },
      { name: "Amil", color: "text-[#444444]", title: "Variedade de produtos", items: ["Opções para diferentes perfis", "Rede própria e credenciada", "Soluções individuais e empresariais"] },
      { name: "Bradesco Saúde", color: "text-[#8E3540]", title: "Foco empresarial", items: ["Categorias para empresas", "Rede referenciada diversificada", "Opções de reembolso por produto"] },
      { name: "Porto Saúde", color: "text-[#555555]", title: "Cuidado próximo", items: ["Produtos para pequenas e médias empresas", "Serviços digitais de atendimento", "Rede conforme região contratada"] },
    ],
    aboutPoints: [
      { title: "Atendimento", copy: "próximo e consultivo" },
      { title: "Comparação", copy: "entre operadoras e redes" },
      { title: "Suporte", copy: "antes e depois da contratação" },
    ],
    reviewValues: [
      { title: "Atendimento que acompanha", copy: "excelente seguradora, fui atendida da melhor forma possível e o meu plano funciona super direitinho, além de estar pagando um ótimo preço, único que nenhuma seguradora foi capaz de me oferecer." },
      { title: "Clareza em cada etapa", copy: "Explicações objetivas sobre rede, carências e valores para uma escolha sem letras miúdas." },
      { title: "Opções para comparar", copy: "Análise de alternativas conforme perfil, localização, cobertura desejada e orçamento." },
    ],

    init() {
      this.scrolled = window.scrollY > 18;
      window.addEventListener("scroll", () => {
        this.scrolled = window.scrollY > 18;
      }, { passive: true });
      
      // Listener para navegação por teclado
      this.keyupListener = (event) => {
        // Não navega se o usuário estiver digitando em um input ou textarea
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
          return;
        }
        
        // Se já estiver navegando, ignora
        if (this.isNavigating) {
          return;
        }
        
        if (event.key === 'ArrowLeft') {
          this.previous();
        } else if (event.key === 'ArrowRight') {
          this.next();
        }
      };
      window.addEventListener('keyup', this.keyupListener);
      
      this.startCarousel();
    },
    
    destroy() {
      // Limpa o listener de teclado quando o componente for destruído
      if (this.keyupListener) {
        window.removeEventListener('keyup', this.keyupListener);
      }
    },

    wa(message) {
      return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;
    },

    openWa(message) {
      window.open(this.wa(message), "_blank", "noopener");
    },

    next() {
      if (this.isNavigating) return;
      this.isNavigating = true;
      this.slide = (this.slide + 1) % this.slides.length;
      this.restartCarousel();
      setTimeout(() => { this.isNavigating = false; }, 500);
    },

    previous() {
      if (this.isNavigating) return;
      this.isNavigating = true;
      this.slide = (this.slide - 1 + this.slides.length) % this.slides.length;
      this.restartCarousel();
      setTimeout(() => { this.isNavigating = false; }, 500);
    },

    goTo(index) {
      if (this.isNavigating) return;
      this.isNavigating = true;
      this.slide = index;
      this.restartCarousel();
      setTimeout(() => { this.isNavigating = false; }, 500);
    },

    startCarousel() {
      if (this.isMouseOverCarousel) {
        return;
      }
      this.pauseCarousel();
      this.carouselTimer = window.setInterval(() => {
        this.slide = (this.slide + 1) % this.slides.length;
      }, 4000);
    },

    pauseCarousel() {
      window.clearInterval(this.carouselTimer);
    },

    onMouseEnterCarousel() {
      this.isMouseOverCarousel = true;
      this.pauseCarousel();
    },

    onMouseLeaveCarousel() {
      this.isMouseOverCarousel = false;
      this.startCarousel();
    },

    restartCarousel() {
      this.startCarousel();
    },

    swipe(endX) {
      const delta = endX - this.touchStart;
      if (Math.abs(delta) > 45) delta < 0 ? this.next() : this.previous();
    },

    submitQuote() {
      if (!this.quote.name || !this.quote.plan || !this.quote.situation) return;
      const message = `Olá! Meu nome é ${this.quote.name}. Tenho interesse em um plano de saúde ${this.quote.plan.toLowerCase()} e se trata de ${this.quote.situation.toLowerCase()}. Gostaria de receber uma cotação.`;
      this.openWa(message);
    },
  }));
});
