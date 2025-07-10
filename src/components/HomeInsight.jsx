import React from 'react';
import HomeInsightHero from './homeinsight/hero/homeinsighthero';
import Featureimg from './homeinsight/features/featureimg';
import HowItWorks from './homeinsight/homeinsightsteps/how-it-works';
import HomeValuation from "./homeinsight/home-valuation/home-valuation"
import CautionHero from "./homeinsight/caution-sec/caution-hero.jsx"

const HomeInsight = () => {
  return<>
  <HomeInsightHero />
  <Featureimg/>
  <HowItWorks/>
  <HomeValuation />
  <CautionHero />
  </> ;
};

export default HomeInsight; 