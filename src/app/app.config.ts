import { IKeyValue } from './model/keyvalue.interface';

export interface IConfig {
  readonly apiUrl: string;
  readonly staticUrl: string;
  readonly backupUrl: string;
  readonly supabaseUrl: string;
  readonly maxImageFileSize: number;
  readonly maxVideoFileSize: number;
  readonly maxOtherFileSize: number;
  readonly maxAnyFileSize: number;
  readonly allowedImageTypes: string[];
  readonly allowedVideoTypes: string[];
  readonly allowedOtherTypes: string[];
  readonly editorCfg: IEditorCfg;
  readonly editorKey: string;
}

export interface IEditorCfg {
  readonly branding: boolean;
  readonly height: number;
  readonly menubar: boolean;
  readonly plugins: string[];
  readonly toolbar: string;
  readonly relative_urls: boolean;
  readonly images_upload_url: string;
  readonly automatic_uploads: boolean;
  readonly verify_html: boolean;
}

const host = window.location.host;
const configs: IKeyValue<IConfig> = {
  'localhost:61490': {
    // 'localhost:4200': {
    apiUrl: 'http://localhost:3030/api/admin',
    staticUrl: 'http://localhost:3030',
    backupUrl: 'http://localhost:3030',
    supabaseUrl: '',
    maxImageFileSize: 10000000,
    maxVideoFileSize: 50000000,
    maxOtherFileSize: 10000000,
    maxAnyFileSize: 10000000,
    allowedImageTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/svg+xml',
      'image/webp',
    ],
    allowedVideoTypes: ['video/mp4'],
    allowedOtherTypes: [
      'text/plain',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'application/pdf',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
    editorCfg: {
      branding: false,
      height: 350,
      menubar: false,
      plugins: ['table', 'link', 'image'],
      toolbar:
        'undo redo styleselect bold italic alignleft aligncenter alignright bullist numlist outdent indent table link image',
      relative_urls: false,
      images_upload_url: 'пишем любую фигню :-)', // без этого кнопка upload не появится
      automatic_uploads: false, // автоматически передавать файлы никуда не надо
      verify_html: false, // предотвращаем вмешательство в структуру
    },
    // editorKey: 'lq981um5w48fit89rd9ikg938asonhdu756rqsrdeeipoal6',
    editorKey: 'zttdqc3g32twznzo01uvrpwypr7dnypdnprxtyzapfmhzg0z',
  },
  'admin.bithab.vio.net.ua': {
    apiUrl: 'https://back.bithab.vio.net.ua/api/admin',
    staticUrl: 'https://static.bithab.vio.net.ua',
    backupUrl: 'https://backup.bithab.vio.net.ua',
    supabaseUrl: '',
    maxImageFileSize: 10000000,
    maxVideoFileSize: 50000000,
    maxOtherFileSize: 10000000,
    maxAnyFileSize: 10000000,
    allowedImageTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/svg+xml',
      'image/webp',
    ],
    allowedVideoTypes: ['video/mp4'],
    allowedOtherTypes: [
      'text/plain',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'application/pdf',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
    editorCfg: {
      branding: false,
      height: 350,
      menubar: false,
      plugins: ['table', 'link', 'image'],
      toolbar:
        'undo redo styleselect bold italic alignleft aligncenter alignright bullist numlist outdent indent table link image',
      relative_urls: false,
      images_upload_url: 'пишем любую фигню :-)', // без этого кнопка upload не появится
      automatic_uploads: false, // автоматически передавать файлы никуда не надо
      verify_html: false, // предотвращаем вмешательство в структуру
    },
    editorKey: 'lq981um5w48fit89rd9ikg938asonhdu756rqsrdeeipoal6',
  },
  'admin.bithab.net': {
    apiUrl: 'https://back.bithab.net/api/admin',
    staticUrl: 'https://static.bithab.net',
    backupUrl: 'https://backup.bithab.net',
    supabaseUrl: '',
    maxImageFileSize: 10000000,
    maxVideoFileSize: 50000000,
    maxOtherFileSize: 10000000,
    maxAnyFileSize: 10000000,
    allowedImageTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/svg+xml',
      'image/webp',
    ],
    allowedVideoTypes: ['video/mp4'],
    allowedOtherTypes: [
      'text/plain',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'application/pdf',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
    editorCfg: {
      branding: false,
      height: 350,
      menubar: false,
      plugins: ['table', 'link', 'image'],
      toolbar:
        'undo redo styleselect bold italic alignleft aligncenter alignright bullist numlist outdent indent table link image',
      relative_urls: false,
      images_upload_url: 'пишем любую фигню :-)', // без этого кнопка upload не появится
      automatic_uploads: false, // автоматически передавать файлы никуда не надо
      verify_html: false, // предотвращаем вмешательство в структуру
    },
    editorKey: 'lq981um5w48fit89rd9ikg938asonhdu756rqsrdeeipoal6',
  },
  'admin.drop.guide': {
    apiUrl: 'https://back.drop.guide/api/admin',
    staticUrl: 'https://static.drop.guide',
    backupUrl: 'https://backup.drop.guide',
    supabaseUrl: '',
    maxImageFileSize: 10000000,
    maxVideoFileSize: 50000000,
    maxOtherFileSize: 10000000,
    maxAnyFileSize: 10000000,
    allowedImageTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/svg+xml',
      'image/webp',
    ],
    allowedVideoTypes: ['video/mp4'],
    allowedOtherTypes: [
      'text/plain',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'application/pdf',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
    editorCfg: {
      branding: false,
      height: 350,
      menubar: false,
      plugins: ['table', 'link', 'image'],
      toolbar:
        'undo redo styleselect bold italic alignleft aligncenter alignright bullist numlist outdent indent table link image',
      relative_urls: false,
      images_upload_url: 'пишем любую фигню :-)', // без этого кнопка upload не появится
      automatic_uploads: false, // автоматически передавать файлы никуда не надо
      verify_html: false, // предотвращаем вмешательство в структуру
    },
    // editorKey: 'lq981um5w48fit89rd9ikg938asonhdu756rqsrdeeipoal6',
    editorKey: 'zttdqc3g32twznzo01uvrpwypr7dnypdnprxtyzapfmhzg0z',
  },
};

export const cfg = configs[host];
