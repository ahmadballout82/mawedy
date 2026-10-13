// =========================================================
// موعدي
// script.js
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

  // =======================================================
  // العناصر الرئيسية
  // =======================================================

  const header =
    document.getElementById("header")

  const menuButton =
    document.getElementById("menuButton")

  const mainNav =
    document.getElementById("mainNav")

  const navLinks =
    document.querySelectorAll(".nav-link")

  const backToTop =
    document.getElementById("backToTop")

  const bookingForm =
    document.getElementById("bookingForm")

  const bookingMessage =
    document.getElementById("bookingMessage")

  const appointmentDate =
    document.getElementById("appointmentDate")

  const specialtyType =
    document.getElementById("specialtyType")

  const doctorName =
    document.getElementById("doctorName")

  const faqItems =
    document.querySelectorAll(".faq-item")

  const sections =
    document.querySelectorAll("main section[id]")


  // =======================================================
  // الهيدر عند التمرير
  // =======================================================

  function updateHeader() {

    if (!header) {
      return
    }

    if (window.scrollY > 30) {

      header.classList.add("scrolled")

    } else {

      header.classList.remove("scrolled")

    }

  }


  updateHeader()


  window.addEventListener(
    "scroll",
    updateHeader
  )


  // =======================================================
  // قائمة الهاتف
  // =======================================================

  function openMenu() {

    if (!menuButton || !mainNav) {
      return
    }

    mainNav.classList.add("active")

    menuButton.classList.add("active")

    document.body.classList.add("menu-open")

    menuButton.setAttribute(
      "aria-expanded",
      "true"
    )

  }


  function closeMenu() {

    if (!menuButton || !mainNav) {
      return
    }

    mainNav.classList.remove("active")

    menuButton.classList.remove("active")

    document.body.classList.remove("menu-open")

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    )

  }


  function toggleMenu() {

    if (!mainNav) {
      return
    }

    const isOpen =
      mainNav.classList.contains("active")

    if (isOpen) {

      closeMenu()

    } else {

      openMenu()

    }

  }


  if (menuButton) {

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    )

    menuButton.addEventListener(
      "click",
      toggleMenu
    )

  }


  navLinks.forEach(function (link) {

    link.addEventListener(
      "click",
      closeMenu
    )

  })


  document.addEventListener(
    "click",
    function (event) {

      if (!mainNav || !menuButton) {
        return
      }

      if (
        !mainNav.classList.contains("active")
      ) {
        return
      }

      const clickedInsideNav =
        mainNav.contains(event.target)

      const clickedMenuButton =
        menuButton.contains(event.target)

      if (
        !clickedInsideNav &&
        !clickedMenuButton
      ) {

        closeMenu()

      }

    }
  )


  document.addEventListener(
    "keydown",
    function (event) {

      if (event.key === "Escape") {

        closeMenu()

      }

    }
  )


  window.addEventListener(
    "resize",
    function () {

      if (window.innerWidth > 900) {

        closeMenu()

      }

    }
  )


  // =======================================================
  // التنقل السلس
  // =======================================================

  const pageLinks =
    document.querySelectorAll('a[href^="#"]')


  pageLinks.forEach(function (link) {

    link.addEventListener(
      "click",
      function (event) {

        const targetId =
          link.getAttribute("href")

        if (
          !targetId ||
          targetId === "#"
        ) {
          return
        }

        const target =
          document.querySelector(targetId)

        if (!target) {
          return
        }

        event.preventDefault()

        const headerHeight =
          header
            ? header.offsetHeight
            : 0

        const targetTop =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerHeight -
          15

        window.scrollTo({

          top: targetTop,

          behavior: "smooth"

        })

      }
    )

  })


  // =======================================================
  // تحديد القسم الحالي
  // =======================================================

  function updateActiveNav() {

    if (!sections.length) {
      return
    }

    const headerHeight =
      header
        ? header.offsetHeight
        : 0

    const scrollPosition =
      window.scrollY +
      headerHeight +
      120

    let currentSection = ""


    sections.forEach(function (section) {

      const sectionTop =
        section.offsetTop

      const sectionHeight =
        section.offsetHeight

      if (
        scrollPosition >= sectionTop &&
        scrollPosition <
        sectionTop + sectionHeight
      ) {

        currentSection =
          section.getAttribute("id")

      }

    })


    navLinks.forEach(function (link) {

      link.classList.remove("active")

      if (
        link.getAttribute("href") ===
        "#" + currentSection
      ) {

        link.classList.add("active")

      }

    })

  }


  updateActiveNav()


  window.addEventListener(
    "scroll",
    updateActiveNav
  )


  // =======================================================
  // FAQ
  // =======================================================

  faqItems.forEach(function (item) {

    const question =
      item.querySelector(".faq-question")

    const answer =
      item.querySelector(".faq-answer")


    if (!question || !answer) {
      return
    }


    question.setAttribute(
      "aria-expanded",
      "false"
    )


    question.addEventListener(
      "click",
      function () {

        const isActive =
          item.classList.contains("active")


        faqItems.forEach(
          function (otherItem) {

            const otherAnswer =
              otherItem.querySelector(".faq-answer")

            const otherQuestion =
              otherItem.querySelector(".faq-question")


            otherItem.classList.remove("active")


            if (otherAnswer) {

              otherAnswer.style.maxHeight =
                null

            }


            if (otherQuestion) {

              otherQuestion.setAttribute(
                "aria-expanded",
                "false"
              )

            }

          }
        )


        if (!isActive) {

          item.classList.add("active")

          answer.style.maxHeight =
            answer.scrollHeight + "px"

          question.setAttribute(
            "aria-expanded",
            "true"
          )

        }

      }
    )

  })


  // =======================================================
  // منع اختيار تاريخ قديم
  // =======================================================

  function setMinimumDate() {

    if (!appointmentDate) {
      return
    }

    const today =
      new Date()

    const year =
      today.getFullYear()

    const month =
      String(
        today.getMonth() + 1
      ).padStart(2, "0")

    const day =
      String(
        today.getDate()
      ).padStart(2, "0")


    appointmentDate.min =
      `${year}-${month}-${day}`

  }


  setMinimumDate()


  // =======================================================
  // ربط التخصص بالطبيب
  // =======================================================

  const doctorsBySpecialty = {

    general: [
      {
        value: "samer",
        text: "د. سامر خالد"
      }
    ],

    dentist: [
      {
        value: "layan",
        text: "د. ليان أحمد"
      }
    ],

    pediatrics: [
      {
        value: "omar",
        text: "د. عمر محمود"
      }
    ],

    dermatology: [
      {
        value: "sara",
        text: "د. سارة يوسف"
      }
    ],

    eyes: [
      {
        value: "ahmad",
        text: "د. أحمد سالم"
      }
    ],

    gynecology: [
      {
        value: "reem",
        text: "د. ريم علي"
      }
    ]

  }


  function updateDoctorOptions() {

    if (!specialtyType || !doctorName) {
      return
    }


    const selectedSpecialty =
      specialtyType.value


    doctorName.innerHTML = ""


    const defaultOption =
      document.createElement("option")

    defaultOption.value = ""

    defaultOption.textContent =
      "اختر الطبيب"

    doctorName.appendChild(
      defaultOption
    )


    if (!selectedSpecialty) {

      doctorName.disabled =
        true

      return

    }


    const doctors =
      doctorsBySpecialty[
        selectedSpecialty
      ] || []


    doctors.forEach(
      function (doctor) {

        const option =
          document.createElement("option")

        option.value =
          doctor.value

        option.textContent =
          doctor.text

        doctorName.appendChild(
          option
        )

      }
    )


    doctorName.disabled =
      false

  }


  if (
    specialtyType &&
    doctorName
  ) {

    doctorName.disabled =
      true

    specialtyType.addEventListener(
      "change",
      updateDoctorOptions
    )

  }


  // =======================================================
  // أزرار الأطباء
  // =======================================================

  const doctorButtons =
    document.querySelectorAll(
      ".doctor-button"
    )


  doctorButtons.forEach(
    function (button) {

      button.addEventListener(
        "click",
        function () {

          const doctorItem =
            button.closest(
              ".doctor-item"
            )

          if (!doctorItem) {
            return
          }


          const doctorTitle =
            doctorItem
              .querySelector("h3")
              ?.textContent
              .trim()

          const specialtyText =
            doctorItem
              .querySelector(
                ".doctor-specialty"
              )
              ?.textContent
              .trim()


          const specialtyMap = {

            "طب عام": "general",

            "طب الأسنان": "dentist",

            "أسنان": "dentist",

            "طب الأطفال": "pediatrics",

            "أطفال": "pediatrics",

            "جلدية": "dermatology",

            "عيون": "eyes",

            "نسائية": "gynecology"

          }


          const doctorMap = {

            "د. سامر خالد": "samer",

            "د. ليان أحمد": "layan",

            "د. عمر محمود": "omar",

            "د. سارة يوسف": "sara",

            "د. أحمد سالم": "ahmad",

            "د. ريم علي": "reem"

          }


          const specialtyValue =
            specialtyMap[
              specialtyText
            ]


          const doctorValue =
            doctorMap[
              doctorTitle
            ]


          if (
            specialtyType &&
            specialtyValue
          ) {

            specialtyType.value =
              specialtyValue

            updateDoctorOptions()

          }


          if (
            doctorName &&
            doctorValue
          ) {

            doctorName.value =
              doctorValue

          }

        }
      )

    }
  )


  // =======================================================
  // أزرار التخصصات
  // =======================================================

  const specialtyCards =
    document.querySelectorAll(
      ".specialty-card"
    )


  specialtyCards.forEach(
    function (card) {

      const link =
        card.querySelector(
          ".specialty-link"
        )

      if (!link) {
        return
      }


      link.addEventListener(
        "click",
        function () {

          const title =
            card
              .querySelector("h3")
              ?.textContent
              .trim()


          const specialtyMap = {

            "طب عام": "general",

            "أسنان": "dentist",

            "أطفال": "pediatrics",

            "جلدية": "dermatology",

            "عيون": "eyes",

            "نسائية": "gynecology"

          }


          const value =
            specialtyMap[title]


          if (
            specialtyType &&
            value
          ) {

            specialtyType.value =
              value

            updateDoctorOptions()

          }

        }
      )

    }
  )


  // =======================================================
  // نموذج الحجز
  // =======================================================

  if (bookingForm) {

    bookingForm.addEventListener(
      "submit",
      function (event) {

        event.preventDefault()


        const patientName =
          document
            .getElementById("patientName")
            ?.value
            .trim()

        const patientPhone =
          document
            .getElementById("patientPhone")
            ?.value
            .trim()

        const patientAge =
          document
            .getElementById("patientAge")
            ?.value

        const selectedSpecialty =
          specialtyType?.value

        const selectedDoctor =
          doctorName?.value

        const selectedDate =
          appointmentDate?.value

        const selectedTime =
          document
            .getElementById(
              "appointmentTime"
            )
            ?.value

        const visitReason =
          document
            .getElementById(
              "visitReason"
            )
            ?.value
            .trim()


        if (
          !patientName ||
          !patientPhone ||
          !patientAge ||
          !selectedSpecialty ||
          !selectedDoctor ||
          !selectedDate ||
          !selectedTime ||
          !visitReason
        ) {

          showBookingMessage(
            "يرجى تعبئة جميع الحقول المطلوبة",
            "error"
          )

          return

        }


        const phonePattern =
          /^[0-9+\-\s()]{7,20}$/


        if (
          !phonePattern.test(
            patientPhone
          )
        ) {

          showBookingMessage(
            "يرجى إدخال رقم هاتف صحيح",
            "error"
          )

          return

        }


        const ageNumber =
          Number(patientAge)


        if (
          !Number.isFinite(ageNumber) ||
          ageNumber < 1 ||
          ageNumber > 120
        ) {

          showBookingMessage(
            "يرجى إدخال عمر صحيح",
            "error"
          )

          return

        }


        const selectedDateObject =
          new Date(
            selectedDate +
            "T00:00:00"
          )

        const today =
          new Date()

        today.setHours(
          0,
          0,
          0,
          0
        )


        if (
          selectedDateObject <
          today
        ) {

          showBookingMessage(
            "يرجى اختيار تاريخ اليوم أو تاريخ قادم",
            "error"
          )

          return

        }


        const submitButton =
          bookingForm.querySelector(
            ".submit-button"
          )


        if (submitButton) {

          submitButton.disabled =
            true

          submitButton.textContent =
            "جارٍ تأكيد الموعد..."

        }


        setTimeout(
          function () {

            showBookingMessage(
              `شكرًا ${patientName}، تم استلام طلب الموعد التجريبي بنجاح`,
              "success"
            )


            bookingForm.reset()

            setMinimumDate()


            if (doctorName) {

              doctorName.innerHTML =
                '<option value="">اختر الطبيب</option>'

              doctorName.disabled =
                true

            }


            if (submitButton) {

              submitButton.disabled =
                false

              submitButton.textContent =
                "تأكيد طلب الموعد"

            }

          },
          700
        )

      }
    )

  }


  // =======================================================
  // رسالة نموذج الحجز
  // =======================================================

  function showBookingMessage(
    message,
    type
  ) {

    if (!bookingMessage) {
      return
    }


    bookingMessage.textContent =
      message


    if (type === "error") {

      bookingMessage.style.color =
        "#d64545"

    } else {

      bookingMessage.style.color =
        "#2e7d32"

    }

  }


  // =======================================================
  // العودة للأعلى
  // =======================================================

  function updateBackToTop() {

    if (!backToTop) {
      return
    }


    if (window.scrollY > 500) {

      backToTop.classList.add(
        "show"
      )

    } else {

      backToTop.classList.remove(
        "show"
      )

    }

  }


  updateBackToTop()


  window.addEventListener(
    "scroll",
    updateBackToTop
  )


  if (backToTop) {

    backToTop.addEventListener(
      "click",
      function () {

        window.scrollTo({

          top: 0,

          behavior: "smooth"

        })

      }
    )

  }


  // =======================================================
  // تأثير ظهور العناصر
  // =======================================================

  const revealElements =
    document.querySelectorAll(
      `
      .specialty-card,
      .doctor-item,
      .step-card,
      .why-feature,
      .review-card,
      .stat-item,
      .faq-item
      `
    )


  revealElements.forEach(
    function (element) {

      element.style.opacity =
        "0"

      element.style.transform =
        "translateY(24px)"

      element.style.transition =
        "opacity 0.6s ease, transform 0.6s ease"

    }
  )


  if (
    "IntersectionObserver" in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        function (
          entries,
          observer
        ) {

          entries.forEach(
            function (entry) {

              if (
                entry.isIntersecting
              ) {

                entry.target.style.opacity =
                  "1"

                entry.target.style.transform =
                  "translateY(0)"

                observer.unobserve(
                  entry.target
                )

              }

            }
          )

        },
        {

          threshold: 0.12

        }
      )


    revealElements.forEach(
      function (element) {

        revealObserver.observe(
          element
        )

      }
    )

  } else {

    revealElements.forEach(
      function (element) {

        element.style.opacity =
          "1"

        element.style.transform =
          "translateY(0)"

      }
    )

  }


  // =======================================================
  // عدادات الإحصائيات
  // =======================================================

  const statNumbers =
    document.querySelectorAll(
      ".stat-item strong"
    )


  function animateCounter(
    element
  ) {

    const originalText =
      element.textContent.trim()

    const numericText =
      originalText.replace(
        /[^0-9.]/g,
        ""
      )

    const target =
      parseFloat(
        numericText
      )


    if (
      !Number.isFinite(target)
    ) {
      return
    }


    const hasPlus =
      originalText.includes("+")

    const hasDecimal =
      originalText.includes(".")

    const duration =
      1200

    const start =
      performance.now()


    function update(
      currentTime
    ) {

      const progress =
        Math.min(
          (currentTime - start) /
          duration,
          1
        )

      const eased =
        1 -
        Math.pow(
          1 - progress,
          3
        )

      const currentValue =
        target * eased


      let displayValue


      if (hasDecimal) {

        displayValue =
          currentValue.toFixed(1)

      } else {

        displayValue =
          Math.floor(
            currentValue
          ).toLocaleString(
            "en-US"
          )

      }


      element.textContent =
        (hasPlus ? "+" : "") +
        displayValue


      if (progress < 1) {

        requestAnimationFrame(
          update
        )

      } else {

        element.textContent =
          originalText

      }

    }


    requestAnimationFrame(
      update
    )

  }


  if (
    "IntersectionObserver" in window
  ) {

    const counterObserver =
      new IntersectionObserver(
        function (
          entries,
          observer
        ) {

          entries.forEach(
            function (entry) {

              if (
                entry.isIntersecting
              ) {

                animateCounter(
                  entry.target
                )

                observer.unobserve(
                  entry.target
                )

              }

            }
          )

        },
        {

          threshold: 0.5

        }
      )


    statNumbers.forEach(
      function (number) {

        counterObserver.observe(
          number
        )

      }
    )

  }


})