import FooterItem from "../Item";
import { PARTNERS, NAVS, SOCIAL, MOREIN } from "../menus";

const FooterItemsContainer = () => {
  return (
    <div className="grid grid-cols-1 gap-6 px-5 py-16 sm:grid-cols-3 sm:px-8 lg:grid-cols-4 ">
      <FooterItem links={PARTNERS} title="PARTNERS" />
      <FooterItem links={NAVS} title="GO TO" />
      <FooterItem links={SOCIAL} title="SOCIAL" />
      <FooterItem links={MOREIN} title="MORE IN " />
    </div>
  );
};

export default FooterItemsContainer;
