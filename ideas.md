# Dalva Bolos — Direção de design

## Abordagens consideradas

### Abordagem 1 — Acervo Botânico Contemporâneo
**Very Brief Intro:** Uma galeria editorial em marfim, com serifas de alta elegância, textura orgânica sutil e fotos conduzindo o ritmo. A confeitaria aparece como trabalho autoral, sem linguagem comercial.
**Probability:** 0.07

### Abordagem 2 — Caderno de Ateliê
**Very Brief Intro:** Um diário visual mais íntimo, com notas manuscritas, papel texturizado e uma navegação que lembra páginas de um caderno de processo.
**Probability:** 0.03

### Abordagem 3 — Sala de Exposição Clara
**Very Brief Intro:** Uma leitura quase museológica, com grandes áreas de respiro, tipografia geométrica discreta e blocos de informação mínimos ao lado das fotografias.
**Probability:** 0.09

## Abordagem escolhida: Acervo Botânico Contemporâneo

### Design Movement
Editorial botanical modernism, aproximando a delicadeza de revistas de interiores e catálogos de ateliês artesanais contemporâneos.

### Core Principles
1. As fotografias são o conteúdo principal; a interface cria contexto e não disputa atenção.
2. A assimetria é intencional: a página deve parecer composta, não encaixotada.
3. O luxo vem da matéria, da tipografia e do espaço, não de ornamentos excessivos.
4. Cada interação é silenciosa, rápida e precisa.

### Color Philosophy
O marfim cria a sensação de papel quente e aproxima a tela do mundo físico. O cinza-grafite mantém uma leitura macia, sem o contraste duro do preto puro. O dourado envelhecido funciona como uma linha de catalogação, reservado para detalhes e estados ativos. Um nude queimado aparece em pequenas superfícies para lembrar creme, pétala seca e bancada de ateliê.

### Layout Paradigm
Uma página com trilho lateral editorial no desktop e cabeçalho compacto no mobile. O conteúdo alterna introduções estreitas, banners texturizados e Masonry em colunas CSS genuínas. A capa da categoria recebe mais presença; o acervo entra depois em fluxo vertical, sem cards uniformes.

### Signature Elements
- Filetes dourados finos e pequenos marcadores numerados, como uma ficha de acervo.
- Banners estreitos com textura botânica/cremosa e título serifado deslocado.
- Molduras de imagem com legenda revelada no hover, mantendo a foto integral.

### Interaction Philosophy
O usuário explora por curiosidade, não por pressão. Categorias podem ser trocadas sem sair da página, fotos abrem em lightbox e o teclado tem o mesmo peso do mouse. O estado ativo é indicado por linha, cor e posição — nunca por excesso de efeitos.

### Animation
Entradas suaves em opacidade e deslocamento de 12px, com atraso de 45ms entre itens visíveis. Hovers alteram apenas escala mínima, sombra e legenda. O lightbox entra com opacidade e escala inicial de 0.97. Tudo respeita `prefers-reduced-motion`.

### Typography System
Títulos em Cormorant Garamond, com peso 500 e itálico pontual para nomes de coleção. Menus e textos auxiliares em Manrope, com tracking levemente aberto. Hierarquia: display 72/0.92 desktop, título de categoria 48/0.98, corpo 15/1.7, etiquetas 10/1.2 em caixa alta.

### Brand Essence
**Posicionamento:** Meu acervo reúne bolos autorais para diferentes celebrações, apresentado com o cuidado de quem trabalha forma, sabor e acabamento à mão.  
**Personalidade:** delicada, criteriosa, próxima.

### Brand Voice
As manchetes são curtas e observacionais. CTAs são convites simples, nunca promessas. A microcopy acompanha as imagens e deixa silêncio entre uma informação e outra.

Exemplos:
- “Eu gosto de deixar cada acabamento aparecer.”
- “Veja o acervo por tema.”

### Wordmark & Logo
Um monograma “D” e “B” desenhado como duas curvas de bico de confeitar que se encontram em uma flor mínima, sem texto dentro do símbolo. No cabeçalho, a marca verbal é tipográfica com Cormorant Garamond e uma pequena linha de catalogação abaixo.

### Signature Brand Color
**Dourado pétala — `#B99468`**. Um dourado apagado, mais próximo de pigmento e papel do que de metal brilhante.

## Style Decisions
- Fundo principal marfim `#F4F0E8`; superfície secundária `#EAE2D5`.
- Grafite `#3E3B37` no lugar de preto puro.
- Masonry com `column-count`, `break-inside: avoid` e imagens em `width: 100%; height: auto`.
- Nenhuma foto será cortada ou distorcida.
- Lightbox em fundo grafite translúcido, com legenda discreta e fechamento por clique, ESC e botão visível.
