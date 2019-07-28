import { Component, ComponentInterface, h } from '@stencil/core';

@Component({
   tag: 'app-settings',
   styleUrl: 'app-settings.scss',
   shadow: false,
   scoped: false
})
export class AppSettings implements ComponentInterface {
   render = () => <div>Settings</div>;
}
