# Guia de logos e trailers

Esta pasta foi reservada para os arquivos visuais do site.

## Logos esperados pelo HTML

Coloque os arquivos aqui com estes nomes:

- `patria-logo.png`
- `gnome-logo.png`
- `gnomes-logo.png`
- `roulettegeddon-logo.png`
- `brazilian-root-logo.png`

Se quiser usar outro nome ou outra extensao, altere o `src` correspondente no `index.html`.

## Tamanho recomendado

O CSS do site e responsivo, entao nao existe um tamanho unico obrigatorio. O mais importante e manter o arquivo em formato horizontal e com fundo transparente.

- Logo do estudio: ideal `1200x400` px, minimo `600x200` px
- Logo de game para hero, destaque e lista: ideal `1600x600` px, minimo `800x300` px
- Formato recomendado: `PNG` ou `WebP` com fundo transparente
- Area de respiro: deixe pelo menos `10%` de margem interna no arquivo para o logo nao parecer apertado

Evite logos quadrados ou muito altos. Os blocos do site favorecem logos mais largos.

## Onde cada logo aparece

- `patria-logo.png`: cabecalho e rodape
- `gnome-logo.png`: arte principal do hero e card do jogo Gnomebody Told You To Climb
- `gnomes-logo.png`: logo transparente no destaque do jogo Gnomebody Told You To Climb
- `roulettegeddon-logo.png`: card da lista de jogos
- `brazilian-root-logo.png`: card do jogo na lista

Se algum arquivo ainda nao existir, o site mostra um fallback em texto ate voce adicionar a imagem.

## Como trocar ou adicionar trailers

Abra o `index.html` e procure pela secao `id="trailers"`.

Cada card de trailer tem um bloco placeholder e um comentario com exemplo de embed. Quando o trailer estiver pronto, troque o placeholder por um `iframe`.

Exemplo YouTube:

```html
<iframe
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="Roulettegeddon trailer"
  loading="lazy"
  referrerpolicy="strict-origin-when-cross-origin"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen
></iframe>
```

Exemplo Vimeo:

```html
<iframe
  src="https://player.vimeo.com/video/VIDEO_ID"
  title="Brazilian Root trailer"
  loading="lazy"
  allow="autoplay; fullscreen; picture-in-picture"
  allowfullscreen
></iframe>
```

## Como adicionar um novo game

1. Duplique um bloco `<article class="game-row reveal">` na secao `#games`
2. Troque numero, titulo, descricao e links
3. Adicione o novo logo nesta pasta
4. Duplique tambem um `<article class="trailer-card reveal">` na secao `#trailers`
5. Substitua o placeholder pelo embed do novo trailer quando ele existir
