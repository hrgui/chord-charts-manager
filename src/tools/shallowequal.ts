import shallowequal from "shallowequal";

export function shallowequalPrint(prevProps, nextProps) {
  Object.keys(prevProps).forEach((key) => {
    console.log(
      key,
      shallowequal(prevProps[key], nextProps[key]),
      prevProps[key],
      nextProps[key]
    );
  });

  return shallowequal(prevProps, nextProps);
}
