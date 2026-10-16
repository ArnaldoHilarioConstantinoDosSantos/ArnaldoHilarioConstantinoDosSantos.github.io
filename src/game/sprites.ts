// Arte em pixels original deste portfólio. Cada caractere é um pixel;
// "." é transparente e os demais são cores da paleta do sprite.

export interface Sprite {
  rows: string[]
  palette: Record<string, string>
}

const devPalette = {
  H: '#5a3418', // cabelo
  S: '#f2c08c', // pele
  K: '#1a1a1a',
  G: '#d9dcec', // fone de ouvido
  B: '#3d7bff', // moletom
  W: '#ffffff',
  P: '#27305e', // calça
  O: '#ff8b3d', // tênis
}

const devTop = [
  '....HHHHH...',
  '...HHHHHHH..',
  '..GHHSSSSS..',
  '..GHSKSSKS..',
  '..GSSSSSSS..',
  '...SSSKKS...',
  '....SSSSS...',
  '...BBBBBBB..',
  '..BBBWBBBBB.',
  '.SBBBWBBBBS.',
  '.SBBBBBBBBS.',
  '...BBBBBBB..',
]

/** Personagem: dev de moletom e fone, em dois quadros de caminhada. */
export const devStand: Sprite = {
  palette: devPalette,
  rows: [...devTop, '...PPPPPPP..', '...PPP.PPP..', '...PP...PP..', '..OOO...OOO.'],
}

export const devStep: Sprite = {
  palette: devPalette,
  rows: [...devTop, '...PPPPPPP..', '....PPPPP...', '....PPPP....', '...OOOOO....'],
}

export const coin: Sprite = {
  palette: { Y: '#ffcc29', W: '#fff3a6', O: '#c98a00', K: '#1a1a1a' },
  rows: [
    '..KKKK..',
    '.KYYYYK.',
    'KYWYYOYK',
    'KYWYYOYK',
    'KYWYYOYK',
    'KYWYYOYK',
    '.KYYYYK.',
    '..KKKK..',
  ],
}

export const cloud: Sprite = {
  palette: { W: '#ffffff', L: '#bcd6ff' },
  rows: [
    '.....WWWW.......',
    '...WWWWWWWW.....',
    '..WWWWWWWWWWWW..',
    '.WWWWWWWWWWWWWW.',
    'WWWWWWWWWWWWWWWW',
    'WWWWWWWWWWWWWWWW',
    '.LLWWLLLWWWLLWW.',
    '...LL...LLL.....',
  ],
}

export const bush: Sprite = {
  palette: { G: '#2fb344', L: '#8cf09a', K: '#1a1a1a' },
  rows: [
    '.....KKKK.......',
    '...KKGGGGKK.KK..',
    '..KGGLGGGGGKGGK.',
    '.KGLGGGGGGGGGGGK',
    'KGGGGGGGGGGGGGGK',
    'KGGGGGGGGGGGGGGK',
  ],
}

const starRows = ['...X...', '...X...', 'XXXXXXX', '.XXXXX.', '..XXX..', '.XX.XX.', '.X...X.']

export const starOn: Sprite = { palette: { X: 'var(--accent)' }, rows: starRows }
export const starOff: Sprite = { palette: { X: 'var(--line-strong)' }, rows: starRows }

export const flag: Sprite = {
  palette: { K: 'var(--ink)', R: 'var(--accent-3)' },
  rows: ['KRRRRR.', 'KRRRRRR', 'KRRRRR.', 'KRRR...', 'K......', 'K......', 'K......', 'K......'],
}
