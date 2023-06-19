// import * as VantComponents from "vant";
// import { Button, Cell, Icon } from "vant";
// import { ConfigProvider } from "vant";
// import { isObject } from "@/utils/validate";

import Vant from "vant";

// const plugins = []
// const components = []

export function setupVant(app) {
  // for ( const [key, component] of Object.entries( VantComponents ) ) {
  //   if ( isObject( component ) && component.name && component.install ) {
  //     // app.component( key, component )
  //     app.use(component);
  //   }
  // }
  app.use(Vant);
}
