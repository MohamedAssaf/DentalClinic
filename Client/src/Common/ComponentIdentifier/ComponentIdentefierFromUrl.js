const violations ="violations";
const statistics = "statistics";
const counters = "counters";

export function getCurrentComponent() {
  let currentUrl = window.location.pathname;
  if (currentUrl.includes(violations))
    return violations;
  else if ( currentUrl.includes(statistics))
    return statistics;
  else if ( currentUrl.includes(counters))
    return counters;
  else
    return "home";
}