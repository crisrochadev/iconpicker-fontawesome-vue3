import iconsv5 from "./fontawesome5/metadata/icons.json";
import iconsv6 from "./fontawesome6/metadata/icons.json";

function getIcons(version, newicons = null) {
  const styleMap = { solid: null, regular: null, brands: null };
  const prefix = "fa-";
  let defaultIcons = iconsv5;
  if (newicons) {
    defaultIcons = newicons;
  } else if (version == 5) {
    defaultIcons = iconsv5;
    styleMap["solid"] = "fas";
    styleMap["regular"] = "far";
    styleMap["brands"] = "fab";
  } else if (version == 6) {
    defaultIcons = iconsv6;
    styleMap["solid"] = "fa-solid";
    styleMap["regular"] = "fa-regular";
    styleMap["brands"] = "fa-brands";
  } else {
    console.error(
      "SweetAwesomeIconPicker: The version must be a number/string, 5 or 6, are the available versions."
    );
    return;
  }
  let icons = [];
  Object.entries(defaultIcons).forEach(([name, obj]) => {
    let nameIcon = styleMap[obj.styles[0]] + " " + prefix + name;
    let search = obj.search.terms;

    let iconsObj = {
      icon: nameIcon,
      search,
      style:obj.styles
    };
    icons.push(iconsObj);
  });

  
  return icons;
}

export default getIcons;
