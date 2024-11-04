import SubNavbar from '../Top Section/SubSection';
import LogoSpace from '../Top Section/LogoSection';
import Navbar from '../Top Section/Navbar';
import StateSubcategories from '../Home/StateCategories';
import BreakingNews from '../BreakingNews';

const TopAllComponent = () => {
  return (
    <div>
      <SubNavbar />
      <LogoSpace />
      <Navbar />
      <StateSubcategories />
      <BreakingNews />
    </div>
  );
};

export default TopAllComponent;
