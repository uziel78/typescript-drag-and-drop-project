// =================== TYPESCRIPT DRAG AND DROP PROJECT ===================== //
// ========================================================================== //

// special comment type in typescript:

/// <reference path="components/project-list.ts" />
/// <reference path="components/project-input.ts" />

namespace App {
  new ProjectInput();
  new ProjectList('active');
  new ProjectList('finished');
}
