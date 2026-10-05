'use client';

import { useMemo, useState } from 'react';

const HOURLY_RATE_USD = 20;
const USD_TO_INR_PLANNING_RATE = 96;
const appTypes = [
  ['simple', 'Simple app', 30, 60],
  ['business', 'Business app', 90, 210],
  ['ecommerce', 'E-commerce', 160, 420],
  ['marketplace', 'Marketplace', 240, 600],
  ['delivery', 'Delivery', 240, 600],
  ['fintech', 'Fintech', 300, 700],
  ['healthcare', 'Healthcare', 280, 650],
  ['ai', 'AI app', 250, 700],
];

const platforms = [
  ['android', 'Android', 1],
  ['ios', 'iOS', 1.05],
  ['both', 'Android + iOS', 1.45],
];

const features = [
  ['login', 'Login', 24],
  ['payments', 'Payments', 72],
  ['chat', 'Chat', 72],
  ['gps', 'GPS / live location', 96],
  ['push', 'Push notifications', 24],
  ['ai', 'AI features', 160],
  ['admin', 'Admin panel', 96],
  ['api', 'API integrations', 96],
];

const formatLakhs = value => value < 1
  ? `₹${Math.round(value * 100000).toLocaleString('en-IN')}`
  : `₹${value.toFixed(1).replace('.0', '')} lakh`;

export default function AppCostCalculator() {
  const [appType, setAppType] = useState('business');
  const [platform, setPlatform] = useState('both');
  const [selectedFeatures, setSelectedFeatures] = useState(['login', 'admin']);

  const estimate = useMemo(() => {
    const [, , minimum, maximum] = appTypes.find(([key]) => key === appType);
    const platformFactor = platforms.find(([key]) => key === platform)[2];
    const featureCost = features.filter(([key]) => selectedFeatures.includes(key)).reduce((sum, [, , cost]) => sum + cost, 0) * (appType === 'simple' ? 0.3 : 1);
    const minimumEstimate = (minimum * platformFactor + featureCost) * HOURLY_RATE_USD * USD_TO_INR_PLANNING_RATE / 100000;
    const maximumEstimate = (maximum * platformFactor + featureCost * 1.6) * HOURLY_RATE_USD * USD_TO_INR_PLANNING_RATE / 100000;
    const lowerLimit = appType === 'simple' ? 0.5 : 1.5;
    return {
      minimum: Math.max(minimumEstimate, lowerLimit),
      maximum: Math.max(maximumEstimate, lowerLimit),
    };
  }, [appType, platform, selectedFeatures]);

  function toggleFeature(key) {
    setSelectedFeatures(current => current.includes(key) ? current.filter(item => item !== key) : [...current, key]);
  }

  return <section className="app-cost-calculator" aria-labelledby="app-cost-calculator-title">
    <div className="app-cost-calculator-heading">
      <p className="section-label">2026 APP DEVELOPMENT COST CALCULATOR</p>
      <h2 id="app-cost-calculator-title">Build a quick budget range for your app.</h2>
      <p>Choose the closest project type, platforms and features. This illustrative estimate uses a lean <strong>${HOURLY_RATE_USD}/hour</strong> rate and ₹{USD_TO_INR_PLANNING_RATE}/USD planning conversion (reference rate reviewed 5 October 2026); it is a starting point, not a market average or fixed quotation.</p>
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
        <p>Indicative planning range using ${HOURLY_RATE_USD}/hour and an approximate ₹{USD_TO_INR_PLANNING_RATE}/USD conversion. Actual quotations depend on team, scope, taxes, and third-party charges.</p>
        <a className="button primary" href="https://wa.me/message/EQ2FP6REOCZXN1" target="_blank" rel="noopener noreferrer">Get a free project estimate <span aria-hidden="true">→</span></a>
      </aside>
    </div>
  </section>;
}
