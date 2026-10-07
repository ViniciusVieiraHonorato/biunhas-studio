# 💅 BI Unhas Studio — Website & Agendamento Online VIP

Projeto de alta performance, design minimalista de luxo e experiência mobile-first desenvolvido para o **BI Unhas Studio** (Beatriz Delli Colli Oliveira) em Santo Amaro, São Paulo.

---

## 🌟 Principais Destaques & Otimizações vs. Maapp Antigo

| Recurso | Maapp Antigo | Novo Site BI Unhas Studio |
| :--- | :--- | :--- |
| **Velocidade & Performance** | Pesado, scripts lentos, recarregamentos desnecessários | **Ultra-rápido (<0.4s)**, HTML5/CSS3/Vanilla JS otimizado |
| **Design & Identidade** | Genérico e poluído | **Minimalista de luxo**, paleta oficial (branco perolado, lavanda, lilás, roxo profundo e rosê gold) |
| **Portfólio** | Inexistente / sem fotos | **Vitrine estilo feed do Instagram @biunhasstudio** com lightbox e stories |
| **Agendamento** | Fluxo confuso | **Wizard em etapas fluidas** (Procedimentos ➔ Calendário ➔ Profissional ➔ Confirmação) |
| **Integração WhatsApp** | Manual | **1-clique com mensagem estruturada** e resumo pronto |
| **Adicionar à Agenda** | Não possui | **Botão direto para Google Agenda / iCal** |
| **Experiência Mobile** | Responsividade básica | **Interface tipo App nativo** com barra inferior de toque |

---

## 🎨 Ideias Inovadoras Exclusivas Implementadas

1. **Simulador Interativo de Nail Art & Calculadora de Orçamento:**
   - A cliente escolhe o **formato da unha** (Almond, Bailarina, Quadrada, Stiletto), o **comprimento** (Curta, Média, Longa, Extra Longa) e o **acabamento** (Nude Glass, Francesinha, Baby Boomer, Glazed Donut Hailey Bieber, Encapsulada Ouro).
   - Renderização gráfica da unha em tempo real.
   - Cálculo automático do valor e tempo estimado, com botão que preenche a Agenda automaticamente!

2. **Calculadora Inteligente de Manutenção:**
   - Algoritmo que calcula a data ideal (intervalo seguro de 21 a 28 dias) para o retorno das unhas em gel/fibra, pulando dias fechados (domingos e segundas).

3. **Resumo Lateral em Tempo Real (Floating Cart Summary):**
   - Atualização instantânea dos valores e tempos conforme a cliente seleciona ou desmarca serviços, evitando surpresas de preço.

4. **Multi-seleção de Procedimentos:**
   - Permite combinar com facilidade: *Alongamento em Fibra + Nail Art Francesinha + Spa dos Pés*.

---

## 📁 Estrutura de Arquivos

```text
biunhas-studio/
├── index.html            # PÁGINA 1: Portfólio Instagram, Apresentação & Simulador
├── agenda.html           # PÁGINA 2: Sistema de Agendamento Online & Calendário
├── css/
│   ├── style.css         # Variáveis, design system, paleta e componentes globais
│   ├── portfolio.css     # Estilos do feed Instagram, stories e simulador
│   └── agenda.css        # Estilos das etapas de agendamento e calendário
├── js/
│   ├── main.js           # Menu mobile, notificações toast e micro-interações
│   ├── portfolio.js      # Lógica do feed, filtros de fotos e simulador
│   └── agenda.js         # Motor do agendamento, calendário e disparo WhatsApp
├── assets/               # Imagens locais (logo, alongamento, gel, nail arts, etc.)
└── README.md             # Esta documentação
```

---

## 🚀 Como Testar Localmente

Basta abrir um terminal na pasta do projeto e executar um servidor HTTP local:

```bash
# Com Python:
python -m http.server 8080

# Em seguida, acesse no navegador:
http://localhost:8080/index.html
http://localhost:8080/agenda.html
```

---

## 📱 Informações do Estúdio Integradas

- **Profissional:** Beatriz Delli Colli Oliveira
- **Endereço:** R. Padre José de Anchieta, 514 - Santo Amaro, São Paulo - SP
- **WhatsApp Oficial:** +55 11 91302-8504
- **Instagram:** [@biunhasstudio](https://www.instagram.com/biunhasstudio/)
