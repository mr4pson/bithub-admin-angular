import { NgModule } from '@angular/core';
import { CAppService } from './app.service';
import { CAuthGuard } from './guards/auth.guard';
import { CDataService } from './data.service';
import { CLangRepository } from './repositories/lang.repository';
import { CSettingRepository } from './repositories/setting.repository';
import { CUploadService } from './upload.service';
import { CAuthService } from './auth.service';
import { CThelangRepository } from './repositories/thelang.repository';
import { CAdminRepository } from './repositories/admin.repository';
import { CWordbookRepository } from './repositories/wordbook.repository';
import { CSlugService } from './slug.service';
import { CFileRepository } from './repositories/file.repository';
import { CBackupRepository } from './repositories/backup.repository';
import { CAdminGroupRepository } from './repositories/admin.group.repository';
import { CMailtemplateRepository } from './repositories/mailtemplate.repository';
import { CCatRepository } from './repositories/cat.repository';
import { CLinktypeRepository } from './repositories/linktype.repository';
import { CPageRepository } from './repositories/page.repository';
import { CGuideRepository } from './repositories/guide.repository';
import { CUserRepository } from './repositories/user.repository';
import { CStatRepository } from './repositories/stat.repository';
import { CTariffRepository } from './repositories/tariff.repository';
import { CPromocodeRepository } from './repositories/promocode.repository';
import { CInorderRepository } from './repositories/inorder.repository';
import { COutorderRepository } from './repositories/outorder.repository';
import { CReforderRepository } from './repositories/reforder.repository';
import { CProposalRepository } from './repositories/proposal.repository';
import { CArtcatRepository } from './repositories/artcat.repository';
import { CArticleRepository } from './repositories/article.repository';
import { CAwardRepository } from './repositories/award.repository';
import { CBaxerRepository } from './repositories/baxer.repository';
import { CCommentRepository } from './repositories/comment.repository';
import { CShopcatRepository } from './repositories/shopcat.repository';
import { CShopitemRepository } from './repositories/shopitem.repository';
import { CShoporderRepository } from './repositories/shoporder.repository';
import { CMailingRepository } from './repositories/mailing.repository';
import { CDropRepository } from './repositories/drop.repository';

@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        CAppService,
        CDataService,
        CAuthService,
        CAuthGuard,
        CUploadService,
        CSlugService,
        // repo
        CThelangRepository,
        CLangRepository,
        CSettingRepository,
        CAdminRepository,
        CAdminGroupRepository,
        CWordbookRepository,
        CFileRepository,
        CBackupRepository,
        CMailtemplateRepository,
        CPageRepository,
        CCatRepository,
        CLinktypeRepository,
        CGuideRepository,
        CUserRepository,
        CTariffRepository,
        CPromocodeRepository,
        CInorderRepository,
        COutorderRepository,
        CReforderRepository,
        CStatRepository,
        CProposalRepository,
        CArtcatRepository,
        CArticleRepository,
        CAwardRepository,
        CBaxerRepository,
        CCommentRepository,
        CShopcatRepository,
        CShopitemRepository,
        CShoporderRepository,
        CMailingRepository,
        CDropRepository,
    ],
})
export class CServicesModule {}
