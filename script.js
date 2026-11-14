document.addEventListener("DOMContentLoaded", () => {
    /* ======================================================================
       1. CARROSSEL DE DESTAQUES
       ====================================================================== */
    const slides = document.querySelectorAll(".slide");
    const pontos = document.querySelectorAll(".ponto");
    const btnAnterior = document.querySelector(".carrossel-btn.anterior");
    const btnProximo = document.querySelector(".carrossel-btn.proximo");
    const carrossel = document.querySelector(".carrossel-container");

    if (slides.length > 0) {
        let slideAtual = 0;
        let intervaloAuto;

        function mostrarSlide(index) {
            if (index >= slides.length) slideAtual = 0;
            else if (index < 0) slideAtual = slides.length - 1;
            else slideAtual = index;

            slides.forEach((slide, i) => {
                slide.classList.toggle("ativo", i === slideAtual);
            });

            pontos.forEach((ponto, i) => {
                ponto.classList.toggle("ativo", i === slideAtual);
            });
        }

        function proximoSlide() {
            mostrarSlide(slideAtual + 1);
        }

        function slideAnterior() {
            mostrarSlide(slideAtual - 1);
        }

        function iniciarAutoPlay() {
            intervaloAuto = setInterval(proximoSlide, 5000);
        }

        function pararAutoPlay() {
            clearInterval(intervaloAuto);
        }

        if (btnProximo) {
            btnProximo.addEventListener("click", () => {
                proximoSlide();
                pararAutoPlay();
                iniciarAutoPlay();
            });
        }

        if (btnAnterior) {
            btnAnterior.addEventListener("click", () => {
                slideAnterior();
                pararAutoPlay();
                iniciarAutoPlay();
            });
        }

        pontos.forEach((ponto) => {
            ponto.addEventListener("click", (e) => {
                const index = parseInt(e.target.dataset.index, 10);
                mostrarSlide(index);
                pararAutoPlay();
                iniciarAutoPlay();
            });
        });

        if (carrossel) {
            carrossel.addEventListener("mouseenter", pararAutoPlay);
            carrossel.addEventListener("mouseleave", iniciarAutoPlay);
        }

        mostrarSlide(slideAtual);
        iniciarAutoPlay();
    }

    /* ======================================================================
       2. ACESSIBILIDADE (TAMANHO DA FONTE E MODO ESCURO)
       ====================================================================== */
    const aumentarFonte = document.getElementById("aumentar-fonte");
    const diminuirFonte = document.getElementById("diminuir-fonte");
    const alternarTema = document.getElementById("alternar-tema");

    let tamanhoFonte = 100;

    const elementosTexto = Array.from(
        document.querySelectorAll(
            "h1, h2, h3, h4, p, label, small, a, button, input, select, textarea, legend, span"
        )
    ).filter((elemento) => !elemento.closest(".barra-acessibilidade"));

    const fontesOriginais = elementosTexto.map((elemento) => ({
        elemento: elemento,
        tamanho: parseFloat(window.getComputedStyle(elemento).fontSize)
    }));

    function atualizarFonte() {
        fontesOriginais.forEach((item) => {
            item.elemento.style.fontSize = (item.tamanho * tamanhoFonte / 100) + "px";
        });
    }

    if (aumentarFonte) {
        aumentarFonte.addEventListener("click", () => {
            if (tamanhoFonte < 140) {
                tamanhoFonte += 10;
                atualizarFonte();
            }
        });
    }

    if (diminuirFonte) {
        diminuirFonte.addEventListener("click", () => {
            if (tamanhoFonte > 80) {
                tamanhoFonte -= 10;
                atualizarFonte();
            }
        });
    }

    function atualizarIconeTema() {
        if (!alternarTema) return;

        const modoEscuro = document.body.classList.contains("modo-escuro");
        alternarTema.textContent = modoEscuro ? "☀️" : "🌙";
        alternarTema.setAttribute(
            "aria-label",
            modoEscuro ? "Ativar tema claro" : "Ativar tema escuro"
        );
        alternarTema.setAttribute(
            "title",
            modoEscuro ? "Ativar tema claro" : "Ativar tema escuro"
        );
    }

    // Restaura a preferência de tema salva anteriormente
    if (localStorage.getItem("temaCafeGraos") === "escuro") {
        document.body.classList.add("modo-escuro");
    }
    atualizarIconeTema();

    if (alternarTema) {
        alternarTema.addEventListener("click", () => {
            document.body.classList.toggle("modo-escuro");
            const modoEscuroAtivo = document.body.classList.contains("modo-escuro");
            localStorage.setItem("temaCafeGraos", modoEscuroAtivo ? "escuro" : "claro");
            atualizarIconeTema();
        });
    }
});