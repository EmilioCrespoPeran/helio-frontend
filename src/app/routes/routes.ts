import { ErrorComponent } from '../components/error/error.component';
import { MainComponent } from "../layouts/main/main.component";

export const routes = [

    {
        path: '',
        component: MainComponent,
        children: [
            { path: 'home', loadChildren: () => import('../components/home/home.module').then(m => m.HomeModule) },
            { path: 'marketplace', loadChildren: () => import('../components/marketplace/marketplace.module').then(m => m.MarketplaceModule) },
            { path: 'translations', loadChildren: () => import('../components/translation/translation.module').then(m => m.TranslationModule) }
        ]
    },

    // Not found
    {   path: '**', component: ErrorComponent },

];
