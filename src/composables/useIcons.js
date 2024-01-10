import getIcons from "@/assets/icons";

export default function useIcons(val, version, currentIcon, style, newicons) {
  function filterIcon() {
    const iconsVersioned =
      newicons.length > 0 ? getIcons(version, icons) : getIcons(version);
    if (currentIcon) {
      const index = iconsVersioned.findIndex((i) => i.icon == currentIcon);
      const deletedIcon = iconsVersioned.splice(index, 1);
      // console.log(deletedIcon[0])
      iconsVersioned.unshift(deletedIcon[0]);
    }
    return iconsVersioned.filter((item) => {
      if (item.search.some((s) => s.includes(val.toLowerCase()))) {
        if (style == "all") {
          return item;
        } else if (item.style.some((st) => st.includes(style))) {
          return item;
        }
      }
    });
  }

  const icons = filterIcon();

  return icons;
}
