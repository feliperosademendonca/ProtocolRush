Boa! ✅ Vamos de **(1) README + estrutura do projeto Phaser** — no estilo “pronto pra você clonar e começar”.

Abaixo eu te entrego:

1.  **Estrutura de pastas** (organizada, escalável e não overengineered)
2.  **README.md completo** (copiar/colar)
3.  **Padrão de código** (arquitetura leve + domínio)
4.  **Checklist do MVP** (pra você não se perder)

> **Stack sugerida (bem padrão no mundo Phaser):** Vite + TypeScript + Phaser 3  
> Se você quiser integrar React depois (launcher, menu, dashboard), dá pra acoplar sem quebrar.

***

# ✅ Estrutura do Projeto (Phaser + TS)

    qbit/
    ├─ README.md
    ├─ package.json
    ├─ tsconfig.json
    ├─ vite.config.ts
    ├─ public/
    │  ├─ index.html
    │  └─ assets/
    │     ├─ sprites/
    │     ├─ tilesets/
    │     ├─ maps/
    │     ├─ audio/
    │     └─ fonts/
    └─ src/
       ├─ main.ts
       ├─ game/
       │  ├─ config/
       │  │  ├─ constants.ts
       │  │  ├─ input.ts
       │  │  └─ physics.ts
       │  ├─ scenes/
       │  │  ├─ BootScene.ts
       │  │  ├─ PreloadScene.ts
       │  │  ├─ TitleScene.ts
       │  │  ├─ LevelScene.ts
       │  │  └─ UIScene.ts
       │  ├─ objects/
       │  │  ├─ Qbit.ts
       │  │  ├─ hazards/
       │  │  │  ├─ Virus.ts
       │  │  │  ├─ BufferZone.ts
       │  │  │  └─ CableInterference.ts
       │  │  └─ interactables/
       │  │     ├─ Bit.ts
       │  │     ├─ Checkpoint.ts
       │  │     └─ HotSwap.ts
       │  ├─ domain/
       │  │  ├─ Protocol.ts
       │  │  ├─ QbitState.ts
       │  │  ├─ valueObjects.ts
       │  │  └─ rules/
       │  │     ├─ ByteRule.ts
       │  │     ├─ DamageRule.ts
       │  │     └─ ProtocolRule.ts
       │  ├─ systems/
       │  │  ├─ AudioSystem.ts
       │  │  ├─ ScoreSystem.ts
       │  │  ├─ SaveSystem.ts
       │  │  ├─ TimerSystem.ts
       │  │  └─ FXSystem.ts
       │  ├─ ui/
       │  │  ├─ Hud.ts
       │  │  └─ widgets/
       │  └─ utils/
       │     ├─ events.ts
       │     ├─ clamp.ts
       │     └─ rng.ts
       └─ styles/
          └─ main.css

### Por que essa estrutura funciona?

*   **Scenes** cuidam de fluxo (carrega, inicia fase, UI)
*   **Objects** são entidades Phaser (sprite, physics, animação)
*   **Domain** guarda as regras do jogo (TCP/UDP, byte shield, dano) sem depender do Phaser
*   **Systems** são serviços (save, score, áudio, FX)
*   Resultado: você mantém “integridade acima de tudo” no design e no código.

***

# 📌 README.md (copiar/colar)

 
# QBIT — Precision Platformer & Speedrunner

**QBIT** é um plataforma de precisão focado em rota, sobrevivência e otimização.  
O jogador **não ataca**: ele atravessa o caminho (Localhost → Gateway → ISP → Cloud) mantendo a **integridade**.

> Pilar: **"Integridade acima de tudo"**  
> Mecânica-chave: coletar **Bits (0/1)** → a cada 8 bits, gera **Byte Shield** (protege 1 hit).

---

## 🎮 Modos de Protocolo

### TCP (Stable Mode)
- Movimento mais pesado e constante
- **Com checkpoints** (Bit Verificador)
- Ideal para aprender e jogar com segurança

### UDP (Burst Mode)
- Movimento mais leve e rápido
- **Sem checkpoints**
- Habilidade exclusiva: **Dash Elétrico**

### Hot-Swap (Tunneling)
- Item temporário: velocidade do UDP + segurança do TCP por **10s**

---

## ✅ Objetivo do MVP (primeira versão jogável)
- 1 mundo (Localhost)
- TCP + UDP + Hot-Swap
- 6 fases curtas (1–3min primeira conclusão)
- HUD básico (modo, bits, shield, timer)
- 1 boss simples (escape/padrões)

---

## 🧱 Requisitos
- Node.js 18+ (recomendado 20+)

---

## 🚀 Rodar local
```bash
npm install
npm run dev
````

Build:

```bash
npm run build
npm run preview
```

***

## 📁 Estrutura (resumo)

*   `src/game/scenes` — cenas do Phaser (boot, preload, level, UI)
*   `src/game/objects` — Qbit, hazards e coletáveis
*   `src/game/domain` — regras puras (protocolos, dano, byte rule)
*   `src/game/systems` — score, áudio, save, FX

***

## 🎛️ Controles (padrão)

*   Mover: `A/D` ou `←/→`
*   Pular: `Espaço`
*   Trocar Protocolo: `Shift`
*   Dash (UDP): `K` (ou `X` no gamepad no futuro)
*   Interagir/Confirmar: `Enter`

***

## 🧠 Regras principais (resumo)

*   A cada 8 Bits → cria 1 Byte Shield (máx. 1)
*   Dano:
    *   com Shield: perde shield + i-frames curtos
    *   sem Shield: morte
*   TCP: respawn no checkpoint
*   UDP: reinicia a fase

***

## 🗺️ Mapas

Mapas em `public/assets/maps` (Tiled `.tmj`/`.json`).  
Tilesets em `public/assets/tilesets`.

Camadas sugeridas:

*   `Terrain` (collider)
*   `Decoration` (no-collider)
*   `Objects` (spawn points / triggers)
*   `Hazards`

***

## 💾 Save/Progress

Save local via `localStorage` (fase liberada, melhores tempos, moedas/bits totais).
Arquivo: `src/game/systems/SaveSystem.ts`

***

## 🧪 Roadmap curto

*   [ ] Movimento + colisão (TCP)
*   [ ] UDP + dash
*   [ ] Bits + Byte Shield (regra do byte)
*   [ ] Checkpoints (TCP)
*   [ ] Timer + rank por fase
*   [ ] 6 fases Localhost
*   [ ] Boss simples
*   [ ] Shop cosmético (depois do MVP)

***

## 📜 Licença MIT
