import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CAuthGuard } from './services/guards/auth.guard';
import { CAdminsModule } from './pages/admins/admins.module';
import { CAuthModule } from './pages/auth/auth.module';
import { CBackupsModule } from './pages/backups/backups.module';
import { CHomePage } from './pages/home/home.page';
import { CLangsModule } from './pages/langs/langs.module';
import { CMailtemplatesModule } from './pages/mailtemplates/mailtemplates.module';
import { COptionsModule } from './pages/options/options.module';
import { CSettingsModule } from './pages/settings/settings.module';
import { CFilesModule } from './pages/files/files.module';
import { CWordbooksModule } from './pages/wordbooks/wordbooks.module';
import { CCatsModule } from './pages/cats/cats.module';
import { CLinktypesModule } from './pages/linktypes/linktypes.module';
import { CPagesModule } from './pages/pages/pages.module';
import { CGuidesModule } from './pages/guides/guides.module';
import { CUsersModule } from './pages/users/users.module';
import { CTariffsModule } from './pages/tariffs/tariffs.module';
import { CPromocodesModule } from './pages/promocodes/promocodes.module';
import { CInordersModule } from './pages/inorders/inorders.module';
import { COutordersModule } from './pages/outorders/outorders.module';
import { CRefordersModule } from './pages/reforders/reforders.module';
import { CProposalsModule } from './pages/proposals/proposals.module';
import { CArtcatsModule } from './pages/artcats/artcats.module';
import { CArticlesModule } from './pages/articles/articles.module';
import { CAwardsModule } from './pages/awards/awards.module';
import { CBaxersModule } from './pages/baxers/baxers.module';
import { CCommentsModule } from './pages/comments/comments.module';
import { CShopcatsModule } from './pages/shopcats/shopcats.module';
import { CShopitemsModule } from './pages/shopitems/shopitems.module';
import { CShopordersModule } from './pages/shoporders/shoporders.module';
import { CMailingsModule } from './pages/mailings/mailings.module';
import { CDropsModule } from './pages/drops/drops.module';

const routes: Routes = [
	{path: "", component: CHomePage, canActivate: [CAuthGuard]},
	{path: "auth", loadChildren: () => CAuthModule},
	{path: "options", loadChildren: () => COptionsModule, canActivate: [CAuthGuard]},
	{path: "settings", loadChildren: () => CSettingsModule, canActivate: [CAuthGuard]},
	{path: "admins", loadChildren: () => CAdminsModule, canActivate: [CAuthGuard]},
	{path: "localization/langs", loadChildren: () => CLangsModule, canActivate: [CAuthGuard]},
	{path: "localization/wordbooks", loadChildren: () => CWordbooksModule, canActivate: [CAuthGuard]},
	{path: "files", loadChildren: () => CFilesModule, canActivate: [CAuthGuard]},
	{path: "backups", loadChildren: () => CBackupsModule, canActivate: [CAuthGuard]},
	{path: "mailtemplates", loadChildren: () => CMailtemplatesModule, canActivate: [CAuthGuard]},
	{path: "mailings", loadChildren: () => CMailingsModule, canActivate: [CAuthGuard]},
	{path: "pages", loadChildren: () => CPagesModule, canActivate: [CAuthGuard]},
	{path: "catalogue/cats", loadChildren: () => CCatsModule, canActivate: [CAuthGuard]},
	{path: "catalogue/linktypes", loadChildren: () => CLinktypesModule, canActivate: [CAuthGuard]},
	{path: "catalogue/guides", loadChildren: () => CGuidesModule, canActivate: [CAuthGuard]},
	{path: "catalogue/proposals", loadChildren: () => CProposalsModule, canActivate: [CAuthGuard]},
	{path: "catalogue/comments", loadChildren: () => CCommentsModule, canActivate: [CAuthGuard]},
	{path: "finances/tariffs", loadChildren: () => CTariffsModule, canActivate: [CAuthGuard]},
	{path: "finances/promocodes", loadChildren: () => CPromocodesModule, canActivate: [CAuthGuard]},
	{path: "finances/inorders", loadChildren: () => CInordersModule, canActivate: [CAuthGuard]},
	{path: "finances/outorders", loadChildren: () => COutordersModule, canActivate: [CAuthGuard]},
	{path: "finances/reforders", loadChildren: () => CRefordersModule, canActivate: [CAuthGuard]},
	{path: "education/artcats", loadChildren: () => CArtcatsModule, canActivate: [CAuthGuard]},
	{path: "education/articles", loadChildren: () => CArticlesModule, canActivate: [CAuthGuard]},
	{path: "misc/awards", loadChildren: () => CAwardsModule, canActivate: [CAuthGuard]},
	{path: "misc/baxers", loadChildren: () => CBaxersModule, canActivate: [CAuthGuard]},
	{path: "misc/drops", loadChildren: () => CDropsModule, canActivate: [CAuthGuard]},
	{path: "shop/shopcats", loadChildren: () => CShopcatsModule, canActivate: [CAuthGuard]},
	{path: "shop/shopitems", loadChildren: () => CShopitemsModule, canActivate: [CAuthGuard]},
	{path: "shop/shoporders", loadChildren: () => CShopordersModule, canActivate: [CAuthGuard]},
	{path: "users", loadChildren: () => CUsersModule, canActivate: [CAuthGuard]},
	{path: "**", redirectTo: "/"},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class CAppRoutingModule { }
