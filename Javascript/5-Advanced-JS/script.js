//Functions returning function

function interviewQuestion(job) {
  switch (job) {
    case "teacher":
      return function(name) {
        console.log("hello " + name);
      };
    case "designer":
      return function(name) {
        console.log("truc " + name);
      };
    default:
      return function(name) {
        console.log(job + " " + name);
      };
  }
}

var teacherQuestion = interviewQuestion("designer");
teacherQuestion("John");

//Same example with Closure (job is still available in inner function even if the outer function as returned)

function interviewQuestionClosure(job) {
  return function(name) {
    switch (job) {
      case "teacher":
        console.log("hello " + name);
        break;
      case "designer":
        console.log("truc " + name);
        break;
      default:
        console.log(job + " " + name);
    }
  };
}

interviewQuestionClosure("teacher")("Jane");
