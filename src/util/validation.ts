// ========== Validation ========== //

export interface Validatable {
  value: string | number;
  required?: boolean;
  minLenght?: number;
  maxLenght?: number;
  // checks values of numbers
  min?: number;
  max?: number;
}

export function validate(validatebleInput: Validatable) {
  let isValid = true;
  if (validatebleInput.required) {
    // false if value after && is zero, returns true if not zero
    isValid = isValid && validatebleInput.value.toString().trim().length !== 0;
  }
  if (
    validatebleInput.minLenght != null &&
    typeof validatebleInput.value === 'string'
  ) {
    isValid =
      isValid && validatebleInput.value.length >= validatebleInput.minLenght;
  }
  if (
    validatebleInput.maxLenght != null &&
    typeof validatebleInput.value === 'string'
  ) {
    isValid =
      isValid && validatebleInput.value.length <= validatebleInput.maxLenght;
  }
  if (
    validatebleInput.min != null &&
    typeof validatebleInput.value === 'number'
  ) {
    isValid = isValid && validatebleInput.value >= validatebleInput.min;
  }
  if (
    validatebleInput.max != null &&
    typeof validatebleInput.value === 'number'
  ) {
    isValid = isValid && validatebleInput.value <= validatebleInput.max;
  }
  return isValid;
}
