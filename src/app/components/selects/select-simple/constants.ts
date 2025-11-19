import { CTranslatableEntity } from 'src/app/model/entities/_translatable.entity';
import { GuideTypes } from 'src/app/model/guide-type.enum';

const build = function build(o: Object): any {
  for (let field in o) {
    if (field === 'translations') {
      this[field] = (window as any).structuredClone(o[field]); // sometimes we need to use "build" to clone the object, this will prevent coping inner objects by reference
    } else {
      this[field] = o[field];
    }
  }

  return this;
};

const translation = function translation(lang_id: number) {
  return this.translations?.find((t) => t.lang_id === lang_id);
};

export const GUIDE_TYPES = [
  {
    id: 1,
    __shift: '',
    translations: [
      {
        id: 1,
        lang_id: 1,
        type: GuideTypes.FullStepsAvaliable,
        name: 'Full access',
      },
    ],
    build: build,
    translation: translation,
  } as CTranslatableEntity<any>,
  {
    id: 2,
    __shift: '',
    translations: [
      {
        id: 1,
        lang_id: 1,
        type: GuideTypes.TwoStepsAvailable,
        name: '2 steps available',
      },
    ],
    build: build,
    translation: translation,
  } as CTranslatableEntity<any>,
  {
    id: 3,
    __shift: '',
    translations: [
      {
        id: 1,
        lang_id: 1,
        type: GuideTypes.LimitAfterAuthAvailable,
        name: 'Limited steps available after auth',
      },
    ],
    build: build,
    translation: translation,
  } as CTranslatableEntity<any>,
  {
    id: 4,
    __shift: '',
    translations: [
      {
        id: 1,
        lang_id: 1,
        type: GuideTypes.Gem,
        name: 'Gem',
      },
    ],
    build: build,
    translation: translation,
  } as CTranslatableEntity<any>,
];

export const AVAILABLE_FOR_LIST = [
  {
    id: 1,
    __shift: '',
    translations: [
      {
        id: 1,
        lang_id: 1,
        type: undefined,
        name: 'Available to everyone',
      },
    ],
    build: build,
    translation: translation,
  } as CTranslatableEntity<any>,
  {
    id: 2,
    __shift: '',
    translations: [
      {
        id: 1,
        lang_id: 1,
        type: 'dg-free',
        name: 'Available to registered users',
      },
    ],
    build: build,
    translation: translation,
  } as CTranslatableEntity<any>,
  {
    id: 3,
    __shift: '',
    translations: [
      {
        id: 1,
        lang_id: 1,
        type: 'dg-pro',
        name: 'Available to DG PRO',
      },
    ],
    build: build,
    translation: translation,
  } as CTranslatableEntity<any>,
  // {
  //   id: 4,
  //   __shift: '',
  //   translations: [
  //     {
  //       id: 1,
  //       lang_id: 1,
  //       type: 'dg-team',
  //       name: 'Available to DG TEAM',
  //     },
  //   ],
  //   build: build,
  //   translation: translation,
  // } as CTranslatableEntity<any>,
];
