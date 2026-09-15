# Meu Casamento — Convite Digital

Convite de casamento online, com abertura em envelope animado, mensagem de boas-vindas, contagem regressiva, localização com mapa e confirmação de presença (RSVP).

## Como personalizar

Todo o conteúdo (nomes, data, mensagem, local, endereço) fica em um único lugar: o objeto `CONFIG` no topo do arquivo [script.js](script.js). Edite os valores e salve — o site é atualizado automaticamente.

Campos principais:

- `groomName` / `brideName` — nomes dos noivos
- `weddingDateISO` — data/hora do casamento (usada na contagem regressiva)
- `heroDateText` / `footerDateText` — data exibida em texto
- `message` — mensagem de boas-vindas
- `ceremony` / `reception` — horário e local de cada etapa
- `address` — endereço usado no mapa (Google Maps, sem necessidade de chave de API)
- `rsvpDeadline` — prazo para confirmar presença
- `formEndpoint` — para onde vão as confirmações de presença (veja abaixo)
- `whatsapp` — número alternativo para receber confirmações via WhatsApp

### Configurando o formulário de confirmação de presença

Como o site é estático (sem back-end), o mais simples é usar o [FormSubmit](https://formsubmit.co) (gratuito):

1. Defina `formEndpoint: "https://formsubmit.co/ajax/SEU-EMAIL@gmail.com"` em `script.js`.
2. Após o primeiro envio de teste, você recebe um e-mail do FormSubmit para confirmar o endereço — clique para ativar.
3. Pronto: toda confirmação de presença chega no seu e-mail.

Alternativa: preencha `whatsapp` com seu número (formato `55DDDNUMERO`, ex: `5511999999999`) para que o botão abra o WhatsApp com a mensagem pronta em vez de enviar por e-mail.

## Rodando localmente

Não há build — é só abrir `index.html` no navegador, ou usar um servidor simples:

```bash
npx serve .
```

## Deploy no Vercel

1. Suba este repositório para o GitHub (já feito).
2. No [Vercel](https://vercel.com), clique em "New Project" e importe o repositório `Meu-Casamento`.
3. Como é um site estático, não é necessário configurar build command nem output directory — clique em "Deploy".
