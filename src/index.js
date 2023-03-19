import "./styles.css";

const LEVEL_FIELD_REGEX = /l[\d]+_name/;
const extractNumFromString = (thestring) =>
  parseInt(thestring.replace(/^\D+/g, ""), 10);
const numberToLevelFieldName = (number) => `l${number}_name`;
const determinePositionAndPushLevelField = (newLevelField, fields) => {
  const newFieldLevelNum = extractNumFromString(newLevelField);
  const sortedArrOfExistingLevelNums = fields
    .filter((field) => LEVEL_FIELD_REGEX.test(field))
    .map(extractNumFromString)
    .sort()
    .reverse();
  const smallestLevelNumberGreaterThanNewFld = sortedArrOfExistingLevelNums.find(
    (levelNumber) => levelNumber > newFieldLevelNum
  );
  const smallestFldGTNewFld =
    smallestLevelNumberGreaterThanNewFld &&
    numberToLevelFieldName(smallestLevelNumberGreaterThanNewFld);
  const locationOfSmallestFldGTNewFld = smallestFldGTNewFld
    ? fields.indexOf(smallestFldGTNewFld)
    : -1;
  const largestNumberLessThanNewFld = sortedArrOfExistingLevelNums.findLast(
    (levelNum) => levelNum < newFieldLevelNum
  );
  const largestFldLTNewFld =
    largestNumberLessThanNewFld &&
    numberToLevelFieldName(largestNumberLessThanNewFld);
  const locationOfLargestFldLTNewFld = largestFldLTNewFld
    ? fields.indexOf(largestFldLTNewFld)
    : -1;
  let locationOfNewField = 0;
  if (locationOfSmallestFldGTNewFld >= 0 && locationOfLargestFldLTNewFld >= 0) {
    locationOfNewField =
      locationOfSmallestFldGTNewFld > locationOfLargestFldLTNewFld
        ? locationOfLargestFldLTNewFld + 1
        : locationOfSmallestFldGTNewFld - 1;
  } else if (locationOfSmallestFldGTNewFld >= 0) {
    locationOfNewField = locationOfSmallestFldGTNewFld;
  } else if (locationOfLargestFldLTNewFld >= 0) {
    locationOfNewField = locationOfLargestFldLTNewFld;
  }
  const newArrBeforeNewField =
    locationOfNewField === fields.length - 1
      ? [...fields.slice(0)]
      : [...fields.slice(0, locationOfNewField)];
  const newArrAfterNewField =
    locationOfNewField === fields.length - 1
      ? []
      : [...fields.slice(locationOfNewField)];

  return [...newArrBeforeNewField, newLevelField, ...newArrAfterNewField];
};
const testWith = (newLevelField, fields) => {
  console.log(
    `determinePositionAndPushLevelField(${newLevelField}, [${fields}]): `,
    determinePositionAndPushLevelField(newLevelField, fields)
  );
};
const test = () => {
  let newLevelField = "l6_name";
  let fields = ["taz", "baz", "l7_name", "foo", "bar", "l14_name"];

  testWith(newLevelField, fields);

  fields = ["taz", "baz", "l14_name", "l7_name", "foo", "bar"];
  testWith(newLevelField, fields);

  fields = ["taz", "baz", "foo", "bar"];
  testWith(newLevelField, fields);

  fields = ["taz", "baz", "foo", "bar", "l5_name"];
  testWith(newLevelField, fields);

  fields = ["taz", "baz", "l7_name", "l14_name", "foo", "bar"];
  testWith(newLevelField, fields);

  fields = ["l7_name", "taz", "baz", "foo", "bar"];
  testWith(newLevelField, fields);
};

test();
