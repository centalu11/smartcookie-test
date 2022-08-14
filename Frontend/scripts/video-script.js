$("document").ready(() => {
  $(".question-modal").modal({
    backdrop: "static",
    keyboard: false,
    show: false,
  });

  let isQuestionAnsweredCorrectly = true;
  let isPaused = false;
  const questionnaires = [
    {
      time: 64,
      question: "3 + 2 = ?",
      choices: [5, 3, 8, 4],
      answer: 5,
    },
  ];
  let questionnaireCounter = 0;

  const video = document.getElementById("video-test-1");

  const showQuestionModal = () => {
    const currentQuestionnaire = questionnaires[questionnaireCounter];

    $(".question-modal .modal-title").html(
      `Question #${questionnaireCounter + 1}`
    );
    $(".question-modal .question-text").html(currentQuestionnaire.question);

    currentQuestionnaire.choices.forEach((option, index) => {
      $(`.question-modal .button-choices:eq(${index})`).html(option);
    });

    $(".question-modal").modal("show");
  };

  const hideQuestionModal = () => {
    $(".question-modal").modal("hide");
    $(".question-modal .button-choices")
      .removeClass("btn-danger")
      .addClass("btn-primary");
  };

  video.ontimeupdate = () => {
    const videoCurrentTime = video.currentTime;
    if (
      questionnaireCounter < questionnaires.length &&
      videoCurrentTime >= questionnaires[questionnaireCounter].time &&
      !isPaused
    ) {
      isPaused = true;
      isQuestionAnsweredCorrectly = false;
      video.pause();
      showQuestionModal();
    }
  };

  video.onplay = () => {
    if (!isQuestionAnsweredCorrectly) {
      video.pause();
    }
  };

  $(".button-choices").on("click", (e) => {
    const currentQuestionnaire = questionnaires[questionnaireCounter];
    const userAnswer = $(e.currentTarget).html();

    if (currentQuestionnaire.answer != userAnswer) {
      $(e.currentTarget).removeClass("btn-primary").addClass("btn-danger");
    } else {
      isQuestionAnsweredCorrectly = true;
      hideQuestionModal();
    }
  });

  $(".question-modal").on("hidden.bs.modal", () => {
    questionnaireCounter++;
    isPaused = false;
    video.play();
  });
});
