// Arte em pixels original deste portfólio. Cada caractere é um pixel;
// "." é transparente e os demais são cores da paleta do sprite.

export interface Sprite {
  rows: string[]
  palette: Record<string, string>
}

const devPalette = {
  H: '#221915', // cabelo cacheado
  h: '#5e4130', // reflexo dos cachos
  S: '#d9a47c', // pele
  s: '#b9825c', // sombra da pele
  G: '#c9ccd8', // armação dos óculos
  L: '#d6ccf2', // lente
  K: '#1a1a1a',
  W: '#ffffff',
  C: '#2b2f3c', // camisa social preta
  c: '#4a5163', // gola, botões e punho dobrado
  P: '#1d2030', // calça
  O: '#ecebf2', // tênis
}

const devTop = [
  '....HhHHhH....',
  '..HhHHHhHHhH..',
  '.HHhHHhHHHhHH.',
  '.hHHHSSSSSHhH.',
  'HHhHSSSSSSShHH',
  'HhHGLKGLKGSHhH',
  'HHHSGGSGGSSHHH',
  'hHHSSSSsSSSHHh',
  'HhHSSKWWKSSHhH',
  '.HHhSSSSSSSHH.',
  '.hHH.SSSS.HhH.',
  '..CCCcSScCCC..',
  '.CCCCCCcCCCCC.',
  '.CCCCCCcCCCCC.',
  '.cCCCCCcCCCCc.',
  '.SCCCCCcCCCCS.',
  '.SCCCCCcCCCCS.',
  '..SPPPPPPPPS..',
  '..PPPPPPPPPP..',
]

/** Personagem: dev de cabelo cacheado, óculos redondos e camisa social, em dois quadros de caminhada. */
export const devStand: Sprite = {
  palette: devPalette,
  rows: [...devTop, '..PPPP..PPPP..', '..PPP....PPP..', '.OOOO....OOOO.'],
}

export const devStep: Sprite = {
  palette: devPalette,
  rows: [...devTop, '...PPPPPPPP...', '....PPPPPP....', '...OOOOOO.....'],
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
