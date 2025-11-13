import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IResponse } from 'src/app/model/dto/response.interface';
import { IAdminAuthData } from 'src/app/model/dto/admin.authdata.interface';
import { IAdminLogin } from 'src/app/model/dto/admin.login.interface';
import { IAdminRecovery } from 'src/app/model/dto/admin.recovery.interface';
import { cfg } from 'src/app/app.config';
import { IThelang } from 'src/app/model/entities/thelang';
import { IGetList } from 'src/app/model/dto/getlist.interface';
import { IAdminVerify } from 'src/app/model/dto/admin.verify.interface';
import { ISetting } from 'src/app/model/entities/setting';
import { IMailtemplate } from 'src/app/model/entities/mailtemplate';
import { ILinktype } from 'src/app/model/entities/linktype';
import { IPage } from 'src/app/model/entities/page';
import { IStatUsersMonthly } from 'src/app/model/entities/stats/stat.users.monthly.interface';
import { IStatCats } from 'src/app/model/entities/stats/stat.cats.interface';
import { ITariff } from 'src/app/model/entities/tariff';
import { IPromocode } from 'src/app/model/entities/promocode';
import { IOutorder } from 'src/app/model/entities/outorder';
import { IStatTotals } from '../model/entities/stats/stat.totals.interface';
import { IReforder } from '../model/entities/reforder';
import { IProposal } from '../model/entities/proposal';
import { IAdminGroup } from '../model/entities/admin.group';
import { IAdmin } from '../model/entities/admin';
import { IArtcat } from '../model/entities/artcat';
import { IBackup } from '../model/entities/backup';
import { ICat } from '../model/entities/cat';
import { IFile } from '../model/entities/file';
import { IWordbook } from '../model/entities/wordbook';
import { IUser } from '../model/entities/user';
import { IGuide } from '../model/entities/guide';
import { IInorder } from '../model/entities/inorder';
import { ILang } from '../model/entities/lang';
import { IArticle } from '../model/entities/article';
import { IAward } from '../model/entities/award';
import { IBaxer } from '../model/entities/baxer';
import { IComment } from '../model/entities/comment';
import { IShopcat } from '../model/entities/shopcat';
import { IShopitem } from '../model/entities/shopitem';
import { IShoporder } from '../model/entities/shoporder';
import { IMailing } from '../model/entities/mailing';
import { IDrop } from '../model/entities/drop';
import { IWithdraworder } from '../model/entities/withdraworder';
import { IToolcat } from '../model/entities/toolcat';
import { ITool } from '../model/entities/tool';

@Injectable()
export class CDataService {
  public authData: IAdminAuthData = null;

  constructor(private http: HttpClient, private router: Router) {}

  public thelangsAll(): Observable<IThelang[]> {
    return this.http.get<IThelang[]>(`/assets/json/thelangs.json`);
  }

  public updateParam(
    obj: string,
    id: number,
    p: string,
    v: any
  ): Observable<IResponse<void>> {
    return this.sendRequest('objects/update-param', { obj, id, p, v });
  }
  public updateEgoisticParam(
    obj: string,
    id: number,
    p: string,
    v: boolean,
    filter: any
  ): Observable<IResponse<void>> {
    return this.sendRequest('objects/update-egoistic-param', {
      obj,
      id,
      p,
      v,
      filter,
    });
  }

  public settingsChunk(dto: IGetList): Observable<IResponse<ISetting[]>> {
    return this.sendRequest('settings/chunk', dto);
  }
  public settingsDelete(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`settings/delete/${id}`);
  }
  public settingsDeleteBulk(ids: number[]): Observable<IResponse<void>> {
    return this.sendRequest('settings/delete-bulk', ids);
  }
  public settingsCreate(fd: FormData): Observable<IResponse<ISetting>> {
    return this.sendRequest('settings/create', fd);
  }

  public adminsChunk(dto: IGetList): Observable<IResponse<IAdmin[]>> {
    return this.sendRequest('admins/chunk', dto);
  }
  public adminsOne(id: number): Observable<IResponse<IAdmin>> {
    return this.sendRequest(`admins/one/${id}`);
  }
  public adminsDelete(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`admins/delete/${id}`);
  }
  public adminsDeleteBulk(ids: number[]): Observable<IResponse<void>> {
    return this.sendRequest('admins/delete-bulk', ids);
  }
  public adminsCreate(fd: FormData): Observable<IResponse<IAdmin>> {
    return this.sendRequest('admins/create', fd);
  }
  public adminsUpdate(fd: FormData): Observable<IResponse<IAdmin>> {
    return this.sendRequest('admins/update', fd);
  }
  public adminsLogin(dto: IAdminLogin): Observable<IResponse<IAdminAuthData>> {
    return this.sendRequest('admins/login', dto);
  }
  public adminsVerify(dto: IAdminVerify): Observable<IResponse<void>> {
    return this.sendRequest('admins/verify', dto);
  }
  public adminsRecover(dto: IAdminRecovery): Observable<IResponse<void>> {
    return this.sendRequest('admins/recover', dto);
  }
  public adminsMe(): Observable<IResponse<IAdmin>> {
    return this.sendRequest(`admins/me`);
  }

  public adminGroupsChunk(dto: IGetList): Observable<IResponse<IAdminGroup[]>> {
    return this.sendRequest('admingroups/chunk', dto);
  }
  public adminGroupsOne(id: number): Observable<IResponse<IAdminGroup>> {
    return this.sendRequest(`admingroups/one/${id}`);
  }

  public langsAll(dto: IGetList): Observable<IResponse<ILang[]>> {
    return this.sendRequest('langs/all', dto);
  }
  public langsChunk(dto: IGetList): Observable<IResponse<ILang[]>> {
    return this.sendRequest('langs/chunk', dto);
  }
  public langsOne(id: number): Observable<IResponse<ILang>> {
    return this.sendRequest(`langs/one/${id}`);
  }
  public langsDelete(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`langs/delete/${id}`);
  }
  public langsDeleteBulk(ids: number[]): Observable<IResponse<void>> {
    return this.sendRequest('langs/delete-bulk', ids);
  }
  public langsCreate(fd: FormData): Observable<IResponse<ILang>> {
    return this.sendRequest('langs/create', fd);
  }
  public langsUpdate(fd: FormData): Observable<IResponse<ILang>> {
    return this.sendRequest('langs/update', fd);
  }

  public wordbooksChunk(dto: IGetList): Observable<IResponse<IWordbook[]>> {
    return this.sendRequest('wordbooks/chunk', dto);
  }
  public wordbooksOne(id: number): Observable<IResponse<IWordbook>> {
    return this.sendRequest(`wordbooks/one/${id}`);
  }
  public wordbooksDelete(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`wordbooks/delete/${id}`);
  }
  public wordbooksDeleteBulk(ids: number[]): Observable<IResponse<void>> {
    return this.sendRequest('wordbooks/delete-bulk', ids);
  }
  public wordbooksCreate(fd: FormData): Observable<IResponse<IWordbook>> {
    return this.sendRequest('wordbooks/create', fd);
  }
  public wordbooksUpdate(fd: FormData): Observable<IResponse<IWordbook>> {
    return this.sendRequest('wordbooks/update', fd);
  }

  public filesChunk(dto: IGetList): Observable<IResponse<IFile[]>> {
    return this.sendRequest('files/chunk', dto);
  }
  public filesOne(id: number): Observable<IResponse<IFile>> {
    return this.sendRequest(`files/one/${id}`);
  }
  public filesDelete(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`files/delete/${id}`);
  }
  public filesDeleteBulk(ids: number[]): Observable<IResponse<void>> {
    return this.sendRequest('files/delete-bulk', ids);
  }
  public filesCreate(fd: FormData): Observable<IResponse<IFile>> {
    return this.sendRequest('files/create', fd);
  }
  public filesUpdate(fd: FormData): Observable<IResponse<IFile>> {
    return this.sendRequest('files/update', fd);
  }

  public mailtemplatesChunk(
    dto: IGetList
  ): Observable<IResponse<IMailtemplate[]>> {
    return this.sendRequest('mailtemplates/chunk', dto);
  }
  public mailtemplatesOne(id: number): Observable<IResponse<IMailtemplate>> {
    return this.sendRequest(`mailtemplates/one/${id}`);
  }
  public mailtemplatesDelete(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`mailtemplates/delete/${id}`);
  }
  public mailtemplatesDeleteBulk(ids: number[]): Observable<IResponse<void>> {
    return this.sendRequest('mailtemplates/delete-bulk', ids);
  }
  public mailtemplatesCreate(
    fd: FormData
  ): Observable<IResponse<IMailtemplate>> {
    return this.sendRequest('mailtemplates/create', fd);
  }
  public mailtemplatesUpdate(
    fd: FormData
  ): Observable<IResponse<IMailtemplate>> {
    return this.sendRequest('mailtemplates/update', fd);
  }

  public backupsChunk(dto: IGetList): Observable<IResponse<IBackup[]>> {
    return this.sendRequest('backups/chunk', dto);
  }
  public backupsDelete(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`backups/delete/${id}`);
  }
  public backupsDeleteBulk(ids: number[]): Observable<IResponse<void>> {
    return this.sendRequest('backups/delete-bulk', ids);
  }
  public backupsCreate(): Observable<IResponse<void>> {
    return this.sendRequest('backups/create');
  }

  public pagesChunk(dto: IGetList): Observable<IResponse<IPage[]>> {
    return this.sendRequest('pages/chunk', dto);
  }
  public pagesOne(id: number): Observable<IResponse<IPage>> {
    return this.sendRequest(`pages/one/${id}`);
  }
  public pagesDelete(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`pages/delete/${id}`);
  }
  public pagesDeleteBulk(ids: number[]): Observable<IResponse<void>> {
    return this.sendRequest('pages/delete-bulk', ids);
  }
  public pagesCreate(fd: FormData): Observable<IResponse<IPage>> {
    return this.sendRequest('pages/create', fd);
  }
  public pagesUpdate(fd: FormData): Observable<IResponse<IPage>> {
    return this.sendRequest('pages/update', fd);
  }

  public catsChunk(dto: IGetList): Observable<IResponse<ICat[]>> {
    return this.sendRequest('cats/chunk', dto);
  }
  public catsOne(id: number): Observable<IResponse<ICat>> {
    return this.sendRequest(`cats/one/${id}`);
  }
  public catsDelete(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`cats/delete/${id}`);
  }
  public catsDeleteBulk(ids: number[]): Observable<IResponse<void>> {
    return this.sendRequest('cats/delete-bulk', ids);
  }
  public catsCreate(fd: FormData): Observable<IResponse<ICat>> {
    return this.sendRequest('cats/create', fd);
  }
  public catsUpdate(fd: FormData): Observable<IResponse<ICat>> {
    return this.sendRequest('cats/update', fd);
  }

  public linktypesChunk(dto: IGetList): Observable<IResponse<ILinktype[]>> {
    return this.sendRequest('linktypes/chunk', dto);
  }
  public linktypesOne(id: number): Observable<IResponse<ILinktype>> {
    return this.sendRequest(`linktypes/one/${id}`);
  }
  public linktypesDelete(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`linktypes/delete/${id}`);
  }
  public linktypesDeleteBulk(ids: number[]): Observable<IResponse<void>> {
    return this.sendRequest('linktypes/delete-bulk', ids);
  }
  public linktypesCreate(fd: FormData): Observable<IResponse<ILinktype>> {
    return this.sendRequest('linktypes/create', fd);
  }
  public linktypesUpdate(fd: FormData): Observable<IResponse<ILinktype>> {
    return this.sendRequest('linktypes/update', fd);
  }

  public guidesChunk(dto: IGetList): Observable<IResponse<IGuide[]>> {
    return this.sendRequest('guides/chunk', dto);
  }
  public guidesOne(id: number): Observable<IResponse<IGuide>> {
    return this.sendRequest(`guides/one/${id}`);
  }
  public guidesDelete(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`guides/delete/${id}`);
  }
  public guidesDeleteBulk(ids: number[]): Observable<IResponse<void>> {
    return this.sendRequest('guides/delete-bulk', ids);
  }
  public guidesCreate(fd: FormData): Observable<IResponse<IGuide>> {
    return this.sendRequest('guides/create', fd);
  }
  public guidesUpdate(fd: FormData): Observable<IResponse<IGuide>> {
    return this.sendRequest('guides/update', fd);
  }

  public usersChunk(dto: IGetList): Observable<IResponse<IUser[]>> {
    return this.sendRequest('users/chunk', dto);
  }
  public usersOne(id: number): Observable<IResponse<IUser>> {
    return this.sendRequest(`users/one/${id}`);
  }
  public usersDelete(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`users/delete/${id}`);
  }
  public usersDeleteBulk(ids: number[]): Observable<IResponse<void>> {
    return this.sendRequest('users/delete-bulk', ids);
  }
  public usersCreate(fd: FormData): Observable<IResponse<IUser>> {
    return this.sendRequest('users/create', fd);
  }
  public usersUpdate(fd: FormData): Observable<IResponse<IUser>> {
    return this.sendRequest('users/update', fd);
  }

  public tariffsChunk(dto: IGetList): Observable<IResponse<ITariff[]>> {
    return this.sendRequest('tariffs/chunk', dto);
  }
  public tariffsOne(id: number): Observable<IResponse<ITariff>> {
    return this.sendRequest(`tariffs/one/${id}`);
  }
  public tariffsDelete(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`tariffs/delete/${id}`);
  }
  public tariffsDeleteBulk(ids: number[]): Observable<IResponse<void>> {
    return this.sendRequest('tariffs/delete-bulk', ids);
  }
  public tariffsCreate(fd: FormData): Observable<IResponse<ITariff>> {
    return this.sendRequest('tariffs/create', fd);
  }
  public tariffsUpdate(fd: FormData): Observable<IResponse<ITariff>> {
    return this.sendRequest('tariffs/update', fd);
  }

  public promocodesChunk(dto: IGetList): Observable<IResponse<IPromocode[]>> {
    return this.sendRequest('promocodes/chunk', dto);
  }
  public promocodesOne(id: number): Observable<IResponse<IPromocode>> {
    return this.sendRequest(`promocodes/one/${id}`);
  }
  public promocodesDelete(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`promocodes/delete/${id}`);
  }
  public promocodesDeleteBulk(ids: number[]): Observable<IResponse<void>> {
    return this.sendRequest('promocodes/delete-bulk', ids);
  }
  public promocodesCreate(fd: FormData): Observable<IResponse<IPromocode>> {
    return this.sendRequest('promocodes/create', fd);
  }
  public promocodesUpdate(fd: FormData): Observable<IResponse<IPromocode>> {
    return this.sendRequest('promocodes/update', fd);
  }

  public inordersChunk(dto: IGetList): Observable<IResponse<IInorder[]>> {
    return this.sendRequest('inorders/chunk', dto);
  }
  public inordersOne(id: number): Observable<IResponse<IInorder>> {
    return this.sendRequest(`inorders/one/${id}`);
  }
  public inordersDelete(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`inorders/delete/${id}`);
  }
  public inordersDeleteBulk(ids: number[]): Observable<IResponse<void>> {
    return this.sendRequest('inorders/delete-bulk', ids);
  }

  public withdrawordersChunk(
    dto: IGetList
  ): Observable<IResponse<IWithdraworder[]>> {
    return this.sendRequest('withdraworders/chunk', dto);
  }
  public withdrawordersOne(id: number): Observable<IResponse<IWithdraworder>> {
    return this.sendRequest(`withdraworders/one/${id}`);
  }
  public withdrawordersDelete(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`withdraworders/delete/${id}`);
  }
  public withdrawordersDeleteBulk(ids: number[]): Observable<IResponse<void>> {
    return this.sendRequest('withdraworders/delete-bulk', ids);
  }

  public outordersChunk(dto: IGetList): Observable<IResponse<IOutorder[]>> {
    return this.sendRequest('outorders/chunk', dto);
  }
  public outordersOne(id: number): Observable<IResponse<IOutorder>> {
    return this.sendRequest(`outorders/one/${id}`);
  }
  public outordersDelete(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`outorders/delete/${id}`);
  }
  public outordersDeleteBulk(ids: number[]): Observable<IResponse<void>> {
    return this.sendRequest('outorders/delete-bulk', ids);
  }

  public refordersChunk(dto: IGetList): Observable<IResponse<IReforder[]>> {
    return this.sendRequest('reforders/chunk', dto);
  }
  public refordersOne(id: number): Observable<IResponse<IReforder>> {
    return this.sendRequest(`reforders/one/${id}`);
  }
  public refordersDelete(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`reforders/delete/${id}`);
  }
  public refordersDeleteBulk(ids: number[]): Observable<IResponse<void>> {
    return this.sendRequest('reforders/delete-bulk', ids);
  }

  public proposalsChunk(dto: IGetList): Observable<IResponse<IProposal[]>> {
    return this.sendRequest('proposals/chunk', dto);
  }
  public proposalsOne(id: number): Observable<IResponse<IProposal>> {
    return this.sendRequest(`proposals/one/${id}`);
  }
  public proposalsDelete(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`proposals/delete/${id}`);
  }
  public proposalsDeleteBulk(ids: number[]): Observable<IResponse<void>> {
    return this.sendRequest('proposals/delete-bulk', ids);
  }
  public proposalsUpdate(fd: FormData): Observable<IResponse<IProposal>> {
    return this.sendRequest('proposals/update', fd);
  }

  public artcatsChunk(dto: IGetList): Observable<IResponse<IArtcat[]>> {
    return this.sendRequest('artcats/chunk', dto);
  }
  public artcatsOne(id: number): Observable<IResponse<IArtcat>> {
    return this.sendRequest(`artcats/one/${id}`);
  }
  public artcatsDelete(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`artcats/delete/${id}`);
  }
  public artcatsDeleteBulk(ids: number[]): Observable<IResponse<void>> {
    return this.sendRequest('artcats/delete-bulk', ids);
  }
  public artcatsCreate(fd: FormData): Observable<IResponse<IArtcat>> {
    return this.sendRequest('artcats/create', fd);
  }
  public artcatsUpdate(fd: FormData): Observable<IResponse<IArtcat>> {
    return this.sendRequest('artcats/update', fd);
  }

  public articlesChunk(dto: IGetList): Observable<IResponse<IArticle[]>> {
    return this.sendRequest('articles/chunk', dto);
  }
  public articlesOne(id: number): Observable<IResponse<IArticle>> {
    return this.sendRequest(`articles/one/${id}`);
  }
  public articlesDelete(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`articles/delete/${id}`);
  }
  public articlesDeleteBulk(ids: number[]): Observable<IResponse<void>> {
    return this.sendRequest('articles/delete-bulk', ids);
  }
  public articlesCreate(fd: FormData): Observable<IResponse<IArticle>> {
    return this.sendRequest('articles/create', fd);
  }
  public articlesUpdate(fd: FormData): Observable<IResponse<IArticle>> {
    return this.sendRequest('articles/update', fd);
  }

  public toolcatsChunk(dto: IGetList): Observable<IResponse<IToolcat[]>> {
    return this.sendRequest('toolcats/chunk', dto);
  }
  public toolcatsOne(id: number): Observable<IResponse<IToolcat>> {
    return this.sendRequest(`toolcats/one/${id}`);
  }
  public toolcatsDelete(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`toolcats/delete/${id}`);
  }
  public toolcatsDeleteBulk(ids: number[]): Observable<IResponse<void>> {
    return this.sendRequest('toolcats/delete-bulk', ids);
  }
  public toolcatsCreate(fd: FormData): Observable<IResponse<IToolcat>> {
    return this.sendRequest('toolcats/create', fd);
  }
  public toolcatsUpdate(fd: FormData): Observable<IResponse<IToolcat>> {
    return this.sendRequest('toolcats/update', fd);
  }

  public toolsChunk(dto: IGetList): Observable<IResponse<ITool[]>> {
    return this.sendRequest('tools/chunk', dto);
  }
  public toolsOne(id: number): Observable<IResponse<ITool>> {
    return this.sendRequest(`tools/one/${id}`);
  }
  public toolsDelete(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`tools/delete/${id}`);
  }
  public toolsDeleteBulk(ids: number[]): Observable<IResponse<void>> {
    return this.sendRequest('tools/delete-bulk', ids);
  }
  public toolsCreate(fd: FormData): Observable<IResponse<ITool>> {
    return this.sendRequest('tools/create', fd);
  }
  public toolsUpdate(fd: FormData): Observable<IResponse<ITool>> {
    return this.sendRequest('tools/update', fd);
  }

  public awardsChunk(dto: IGetList): Observable<IResponse<IAward[]>> {
    return this.sendRequest('awards/chunk', dto);
  }
  public awardsOne(id: number): Observable<IResponse<IAward>> {
    return this.sendRequest(`awards/one/${id}`);
  }
  public awardsDelete(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`awards/delete/${id}`);
  }
  public awardsDeleteBulk(ids: number[]): Observable<IResponse<void>> {
    return this.sendRequest('awards/delete-bulk', ids);
  }
  public awardsCreate(fd: FormData): Observable<IResponse<IAward>> {
    return this.sendRequest('awards/create', fd);
  }
  public awardsUpdate(fd: FormData): Observable<IResponse<IAward>> {
    return this.sendRequest('awards/update', fd);
  }

  public statsUsersMonthly(dto: {
    from: string;
    to: string;
  }): Observable<IResponse<IStatUsersMonthly>> {
    return this.sendRequest(`stats/users-monthly`, dto);
  }
  public statsCats(): Observable<IResponse<IStatCats>> {
    return this.sendRequest(`stats/cats`);
  }
  public statsInordersMonthly(year: number): Observable<IResponse<number[]>> {
    return this.sendRequest(`stats/inorders-monthly/${year}`);
  }
  public statsTotals(): Observable<IResponse<IStatTotals>> {
    return this.sendRequest(`stats/totals`);
  }

  public baxersChunk(dto: IGetList): Observable<IResponse<IBaxer[]>> {
    return this.sendRequest('baxers/chunk', dto);
  }
  public baxersOne(id: number): Observable<IResponse<IBaxer>> {
    return this.sendRequest(`baxers/one/${id}`);
  }
  public baxersDelete(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`baxers/delete/${id}`);
  }
  public baxersDeleteBulk(ids: number[]): Observable<IResponse<void>> {
    return this.sendRequest('baxers/delete-bulk', ids);
  }
  public baxersCreate(fd: FormData): Observable<IResponse<IBaxer>> {
    return this.sendRequest('baxers/create', fd);
  }
  public baxersUpdate(fd: FormData): Observable<IResponse<IBaxer>> {
    return this.sendRequest('baxers/update', fd);
  }

  public commentsChunk(dto: IGetList): Observable<IResponse<IComment[]>> {
    return this.sendRequest('comments/chunk', dto);
  }
  public commentsOne(id: number): Observable<IResponse<IComment>> {
    return this.sendRequest(`comments/one/${id}`);
  }
  public commentsOneWithUser(id: number): Observable<IResponse<IComment>> {
    return this.sendRequest(`comments/one-with-user/${id}`);
  }
  public commentsDelete(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`comments/delete/${id}`);
  }
  public commentsDeleteBulk(ids: number[]): Observable<IResponse<void>> {
    return this.sendRequest('comments/delete-bulk', ids);
  }
  public commentsCreate(fd: FormData): Observable<IResponse<IComment>> {
    return this.sendRequest('comments/create', fd);
  }
  public commentsUpdate(fd: FormData): Observable<IResponse<IComment>> {
    return this.sendRequest('comments/update', fd);
  }

  public shopcatsChunk(dto: IGetList): Observable<IResponse<IShopcat[]>> {
    return this.sendRequest('shopcats/chunk', dto);
  }
  public shopcatsOne(id: number): Observable<IResponse<IShopcat>> {
    return this.sendRequest(`shopcats/one/${id}`);
  }
  public shopcatsDelete(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`shopcats/delete/${id}`);
  }
  public shopcatsDeleteBulk(ids: number[]): Observable<IResponse<void>> {
    return this.sendRequest('shopcats/delete-bulk', ids);
  }
  public shopcatsCreate(fd: FormData): Observable<IResponse<IShopcat>> {
    return this.sendRequest('shopcats/create', fd);
  }
  public shopcatsUpdate(fd: FormData): Observable<IResponse<IShopcat>> {
    return this.sendRequest('shopcats/update', fd);
  }

  public shopitemsChunk(dto: IGetList): Observable<IResponse<IShopitem[]>> {
    return this.sendRequest('shopitems/chunk', dto);
  }
  public shopitemsOne(id: number): Observable<IResponse<IShopitem>> {
    return this.sendRequest(`shopitems/one/${id}`);
  }
  public shopitemsDelete(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`shopitems/delete/${id}`);
  }
  public shopitemsDeleteBulk(ids: number[]): Observable<IResponse<void>> {
    return this.sendRequest('shopitems/delete-bulk', ids);
  }
  public shopitemsCreate(fd: FormData): Observable<IResponse<IShopitem>> {
    return this.sendRequest('shopitems/create', fd);
  }
  public shopitemsUpdate(fd: FormData): Observable<IResponse<IShopitem>> {
    return this.sendRequest('shopitems/update', fd);
  }
  public shopitemsArchive(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`shopitems/archive/${id}`);
  }
  public shopitemsArchiveBulk(ids: number[]): Observable<IResponse<void>> {
    return this.sendRequest('shopitems/archive-bulk', ids);
  }

  public shopordersChunk(dto: IGetList): Observable<IResponse<IShoporder[]>> {
    return this.sendRequest('shoporders/chunk', dto);
  }
  public shopordersOne(id: number): Observable<IResponse<IShoporder>> {
    return this.sendRequest(`shoporders/one/${id}`);
  }
  public shopordersDelete(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`shoporders/delete/${id}`);
  }
  public shopordersDeleteBulk(ids: number[]): Observable<IResponse<void>> {
    return this.sendRequest('shoporders/delete-bulk', ids);
  }
  public shopordersUpdate(fd: FormData): Observable<IResponse<IShoporder>> {
    return this.sendRequest('shoporders/update', fd);
  }

  public mailingsChunk(dto: IGetList): Observable<IResponse<IMailing[]>> {
    return this.sendRequest('mailings/chunk', dto);
  }
  public mailingsOne(id: number): Observable<IResponse<IMailing>> {
    return this.sendRequest(`mailings/one/${id}`);
  }
  public mailingsOneShort(id: number): Observable<IResponse<IMailing>> {
    return this.sendRequest(`mailings/one-short/${id}`);
  }
  public mailingsDelete(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`mailings/delete/${id}`);
  }
  public mailingsDeleteBulk(ids: number[]): Observable<IResponse<void>> {
    return this.sendRequest('mailings/delete-bulk', ids);
  }
  public mailingsCreate(fd: FormData): Observable<IResponse<IMailing>> {
    return this.sendRequest('mailings/create', fd);
  }
  public mailingsUpdate(fd: FormData): Observable<IResponse<IMailing>> {
    return this.sendRequest('mailings/update', fd);
  }
  public mailingsRun(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`mailings/run/${id}`);
  }
  public mailingsRunForAll(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`mailings/run-for-all/${id}`);
  }

  public dropsChunk(dto: IGetList): Observable<IResponse<IDrop[]>> {
    return this.sendRequest('drops/chunk', dto);
  }
  public dropsOne(id: number): Observable<IResponse<IDrop>> {
    return this.sendRequest(`drops/one/${id}`);
  }
  public dropsDelete(id: number): Observable<IResponse<void>> {
    return this.sendRequest(`drops/delete/${id}`);
  }
  public dropsDeleteBulk(ids: number[]): Observable<IResponse<void>> {
    return this.sendRequest('drops/delete-bulk', ids);
  }
  public dropsCreate(fd: FormData): Observable<IResponse<IDrop>> {
    return this.sendRequest('drops/create', fd);
  }
  public dropsUpdate(fd: FormData): Observable<IResponse<IDrop>> {
    return this.sendRequest('drops/update', fd);
  }

  ////////////////
  // utils
  ////////////////

  private sendRequest(url: string, body: Object = null): Observable<any> {
    const headersContent = {};
    this.authData?.token && (headersContent['token'] = this.authData.token);
    const headers = new HttpHeaders(headersContent);
    return this.http
      .post(`${cfg.apiUrl}/${url}`, body, { headers })
      .pipe(filter((res) => this.processResponse(res)));
  }

  private processResponse(res: any): boolean {
    if (res.statusCode === 403) {
      console.log(res.error);
      this.router.navigateByUrl('/auth/logout');
      return false;
    }

    return true;
  }
}
