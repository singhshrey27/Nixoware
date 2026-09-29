'use client';

import { useMemo, useState } from 'react';

const appTypes = [
  ['simple', 'Simple app', 3, 8],
  ['business', 'Business app', 8, 20],
  ['ecommerce', 'E-commerce', 10, 24],
  ['marketplace', 'Marketplace', 15, 40],
  ['delivery', 'Delivery', 15, 40],
  ['fintech', 'Fintech', 25, 60],
  ['healthcare', 'Healthcare', 18, 45],
  ['ai', 'AI app', 15, 45],
];

const platforms = [
  ['android', 'Android', 0],
  ['ios', 'iOS', 1],
  ['both', 'Android + iOS', 1.55],
];

const features = [
  ['login', 'Login', 0.5],
  ['payments', 'Payments', 1.5],
  ['chat', 'Chat', 1.5],
  ['gps', 'GPS / live location', 2],
  ['push', 'Push notifications', 0.5],
  ['ai', 'AI features', 4],
  ['admin', 'Admin panel', 2],
  ['api', 'API integrations', 2],
];

const formatLakhs = value => `₹${value.toFixed(1).replace('.0', '')} lakh`;

export default function AppCostCalculator() {
  const [appType, setAppType] = useState('business');
  const [platform, setPlatform] = useState('both');
  const [selectedFeatures, setSelectedFeatures] = useState(['login', 'admin']);

  const estimate = useMemo(() => {
    const [, , minimum, maximum] = appTypes.find(([key]) => key === appType);
    const platformFactor = platforms.find(([key]) => key === platform)[2];
    const featureCost = features.filter(([key]) => selectedFeatures.includes(key)).reduce((sum, [, , cost]) => sum + cost, 0);
    const platformCost = platform === 'android' ? 0 : platform === 'ios' ? 1 : 3;
    return {
      minimum: minimum + platformCost + featureCost,
      maximum: maximum * platformFactor + platformCost + featureCost * 1.8,
    };
  }, [appType, platform, selectedFeatures]);

  function toggleFeature(key) {
    setSelectedFeatures(current => current.includes(key) ? current.filter(item => item !== key) : [...current, key]);
  }

  return <section className="app-cost-calculator" aria-labelledby="app-cost-calculator-title">
    <div className="app-cost-calculator-heading">
      <p className="section-label">2026 APP DEVELOPMENT COST CALCULATOR</p>
      <h2 id="app-cost-calculator-title">Build a quick budget range for your app.</h2>
      <p>Choose the closest project type, platforms and features. This planning estimate is a starting range, not a fixed quotation.</p>
    </div>
    <div className="app-cost-calculator-grid">
      <div className="app-cost-calculator-controls">
        <fieldset><legend>Choose your app</legend><div className="calculator-options">{appTypes.map(([key, label]) => <label className={appType === key ? 'selected' : ''} key={key}><input type="radio" name="app-type" value={key} checked={appType === key} onChange={() => setAppType(key)} /><span>{label}</span></label>)}</div></fieldset>
        <fieldset><legend>Platforms</legend><div className="calculator-options calculator-platforms">{platforms.map(([key, label]) => <label className={platform === key ? 'selected' : ''} key={key}><input type="radio" name="platform" value={key} checked={platform === key} onChange={() => setPlatform(key)} /><span>{label}</span></label>)}</div></fieldset>
        <fieldset><legend>Features</legend><div className="calculator-options">{features.map(([key, label]) => <label className={selectedFeatures.includes(key) ? 'selected' : ''} key={key}><input type="checkbox" checked={selectedFeatures.includes(key)} onChange={() => toggleFeature(key)} /><span>{label}</span></label>)}</div></fieldset>
      </div>
      <aside className="app-cost-calculator-result" aria-live="polite">
        <p className="section-label">ESTIMATED DEVELOPMENT RANGE</p>
        <strong>{formatLakhs(estimate.minimum)}–{formatLakhs(estimate.maximum)}</strong>
        <p>Indicative planning range for a professionally designed, tested and deployable app in India.</p>
        <a className="button primary" href="/contact">Get a free project estimate <span aria-hidden="true">→</span></a>
      </aside>
    </div>
  </section>;
}
