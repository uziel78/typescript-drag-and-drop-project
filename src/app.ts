// =================== ACCESSING ELEMENTS / RENDERING FORM ===================== //
// ============================================================================= //

// ========== Autobind Decorator ========== //

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

// ========== Validation ========== //

interface Validatable {
  value: string | number;
  required?: boolean;
  minLenght?: number;
  maxLenght?: number;
  // checks values of numbers
  min?: number;
  max?: number;
}

function validate(validatebleInput: Validatable) {
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

// ========== ProjectList Class ========== //

class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;

  constructor(private type: 'active' | 'finished') {
    this.templateElement = document.getElementById(
      'project-list'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;
    this.attach();
    this.renderContent();
  }

  // fill blank spaces of template
  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('H2')!.textContent =
      this.type.toLocaleUpperCase() + ' PROJECTS';
  }

  // render list to DOM
  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }
}

// ========== Project Input Class ========== //
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  // input elements of form
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      'project-input'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    // when instance of class is instansiated, we render the form
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    //add id for styling (see css-file)
    this.element.id = 'user-input';

    // input elements accessed inside every object/class created:
    this.titleInputElement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      '#people'
    ) as HTMLInputElement;

    // execute methods below
    this.configure();
    this.attach();
  }

  // gather user input data, validate and return
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    // create validatable objects

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };

    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLenght: 5,
    };

    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    //validation:
    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert('Invalid input, please try again!');
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  // clear input after submit (form cleared)
  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    // check at runtime if userInput is Tuple (compiled to Array in Javascript)
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      console.log(title, desc, people);
      this.clearInputs();
    }
  }

  private configure() {
    // option without creating an autobind decorator (see Autobind above)
    //this.element.addEventListener('submit', this.submitHandler.bind(this));
    this.element.addEventListener('submit', this.submitHandler);
  }

  // render to DOM
  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');
