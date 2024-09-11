# Open Weather Electron

An Electron application of the original Open Weather app, now packaged with Vite, React, and TypeScript for cross-platform desktop usage.

[Open Weather doc](https://github.com/Quillinan/OpenWeather?tab=readme-ov-file#readme)

## Prerequisites

- Node.js v14+
- Yarn v1.22+

### Arquivo .env

- Clone o `.env.example`
- Renomeie a cópia como `.env`
- Configure `.env`
  <details>
    <summary> Insira a sua chave da API OpenWeather </summary>
    
    - Seguindo os padrões do documento original, preencha de acordo com o exemplo abaixo:
    
      ```js
      VITE_API_KEY=suaChave
      ```
  </details>

## Project Setup

### Install

```bash
$ yarn
```

### Development

```bash
$ yarn dev
```

### Build

```bash
# For windows
$ yarn build:win

# For macOS
$ yarn build:mac

# For Linux
$ yarn build:linux
```
