// 此文件跟同级目录的 global.d.ts 文件一样也是全局类型声明，只不过这里存放一些零散的全局类型，无需引入直接在 .vue 、.ts 、.tsx 文件使用即可获得类型提示

type RefType<T> = T | null;

type EmitType = (event: string, ...args: any[]) => void;

type TargetContext = "_self" | "_blank";

type ComponentRef<T extends HTMLElement = HTMLDivElement> =
  ComponentElRef<T> | null;

type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

type ForDataType<T> = {
  [P in T]?: ForDataType<T[P]>;
};

type AnyFunction<T> = (...args: any[]) => T;

type PropType<T> = VuePropType<T>;

type Writable<T> = {
  -readonly [P in keyof T]: T[P];
};

type Nullable<T> = T | null;

type NonNullable<T> = T extends null | undefined ? never : T;

type Recordable<T = any> = Record<string, T>;

type ReadonlyRecordable<T = any> = {
  readonly [key: string]: T;
};

type Indexable<T = any> = {
  [key: string]: T;
};

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

type Exclusive<T, U> = (Without<T, U> & U) | (Without<U, T> & T);

type TimeoutHandle = ReturnType<typeof setTimeout>;

type IntervalHandle = ReturnType<typeof setInterval>;

type Effect = "light" | "dark";

interface ChangeEvent extends Event {
  target: HTMLInputElement;
}

interface WheelEvent {
  path?: EventTarget[];
}

interface ImportMetaEnv extends ViteEnv {
  __: unknown;
}

interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}

interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T;
}

function parseInt(s: string | number, radix?: number): number;

function parseFloat(string: string | number): number;

import type {
  VNode,
  FunctionalComponent,
  PropType as VuePropType,
  ComponentPublicInstance,
} from "vue";
import type { ECharts } from "echarts";
import type { IconifyIcon } from "@iconify/vue";
import type { TableColumns } from "@pureadmin/table";
import { type RouteComponent, type RouteLocationNormalized } from "vue-router";

/**
 * 全局类型声明，无需引入直接在 `.vue` 、`.ts` 、`.tsx` 文件使用即可获得类型提示
 */
declare global {
  /**
   * 平台的名称、版本、依赖、最后构建时间的类型提示
   */
  const __APP_INFO__: {
    pkg: {
      name: string;
      version: string;
      dependencies: Recordable<string>;
      devDependencies: Recordable<string>;
    };
    lastBuildTime: string;
  };

  /**
   * Window 的类型提示
   */
  interface Window {
    // Global vue app instance
    __APP__: App<Element>;
    webkitCancelAnimationFrame: (handle: number) => void;
    mozCancelAnimationFrame: (handle: number) => void;
    oCancelAnimationFrame: (handle: number) => void;
    msCancelAnimationFrame: (handle: number) => void;
    webkitRequestAnimationFrame: (callback: FrameRequestCallback) => number;
    mozRequestAnimationFrame: (callback: FrameRequestCallback) => number;
    oRequestAnimationFrame: (callback: FrameRequestCallback) => number;
    msRequestAnimationFrame: (callback: FrameRequestCallback) => number;
  }

  /**
   * 打包压缩格式的类型声明
   */
  type ViteCompression =
    | "none"
    | "gzip"
    | "brotli"
    | "both"
    | "gzip-clear"
    | "brotli-clear"
    | "both-clear";

  /**
   * 全局自定义环境变量的类型声明
   * @see {@link https://yiming_chang.gitee.io/pure-admin-doc/pages/config/#%E5%85%B7%E4%BD%93%E9%85%8D%E7%BD%AE}
   */
  interface ViteEnv {
    VITE_PORT: number;
    VITE_PUBLIC_PATH: string;
    VITE_ROUTER_HISTORY: string;
    VITE_CDN: boolean;
    VITE_HIDE_HOME: string;
    VITE_COMPRESSION: ViteCompression;
  }

  /**
   * `src/router` 文件夹里的类型声明
   */
  interface toRouteType extends RouteLocationNormalized {
    meta: {
      roles: Array<string>;
      keepAlive?: boolean;
      dynamicLevel?: string;
    };
  }
}
