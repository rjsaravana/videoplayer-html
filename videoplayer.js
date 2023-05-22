
setTimeout(() => {
  var video = document.getElementsByTagName("video")[0],
    play = document.getElementsByClassName("video__play")[0],
    timeline = document.getElementsByClassName("timeline")[0],
    timelineProgress = document.getElementsByClassName("timeline__progress")[0],
    drag = document.getElementsByClassName("timeline__drag")[0];
  play.addEventListener("click", togglePlay, false);

  function togglePlay() {
    if (video.paused) {
     

      video.play();
    } else {
     
      video.pause();
    }
  }

  video.onplay = function () {
    TweenMax.ticker.addEventListener("tick", vidUpdate);
  };
  video.onpause = function () {
    TweenMax.ticker.removeEventListener("tick", vidUpdate);
  };
  video.onended = function () {
    TweenMax.ticker.removeEventListener("tick", vidUpdate);
  };

  function vidUpdate() {
    TweenMax.set(timelineProgress, {
      scaleX: (video.currentTime / video.duration).toFixed(5)
    });
    TweenMax.set(drag, {
      x: ((video.currentTime / video.duration) * timeline.offsetWidth).toFixed(4)
    });
  }


  Draggable.create(drag, {
    type: "x",
    trigger: timeline,
    bounds: timeline,
    onPress: function (e) {
      video.currentTime = (this.x / this.maxX) * video.duration;
      TweenMax.set(this.target, {
        x: this.pointerX - timeline.getBoundingClientRect().left
      });
      this.update();
      var progress = this.x / timeline.offsetWidth;
      TweenMax.set(timelineProgress, {
        scaleX: progress
      });
    },
    onDrag: function () {
      video.currentTime = (this.x / this.maxX) * video.duration;
      var progress = this.x / timeline.offsetWidth;
      TweenMax.set(timelineProgress, {
        scaleX: progress
      });
    },
    onRelease: function (e) {
      e.preventDefault();
    }
  });
}, 500)


setTimeout(() => {
  const video = document.getElementById("video-active");
  const durationDisplay = document.getElementById("current");

  video.addEventListener("loadedmetadata", () => {
    const duration = video.duration;
    durationDisplay.textContent = formatTime(duration);
  });

  video.addEventListener("timeupdate", () => {
    const currentTime = video.currentTime;
    durationDisplay.textContent = formatTime(currentTime);
  });

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${padZero(minutes)}:${padZero(seconds)}`;
  }

  function padZero(value) {
    return value.toString().padStart(2, "0");
  }
}, 500)

setTimeout(() => {
  const playicon = document.getElementById('playicon');
  const pauseicon = document.getElementById('pauseicon');

  playicon.addEventListener('click', function() {

    playicon.classList.add('hidden');
    pauseicon.classList.remove('hidden');
  });

  pauseicon.addEventListener('click', function() {

    pauseicon.classList.add('hidden');
    playicon.classList.remove('hidden');
  });
}, 500);