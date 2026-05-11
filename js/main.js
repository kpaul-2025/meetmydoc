/* =========================================================
   main.js
   FINAL FIXED VERSION
   ========================================================= */

(function ($) {
  "use strict";

  /* =========================================================
     HELPERS
     ========================================================= */

  function hideSpinner() {

    try {

      var preloader =
      document.getElementById('preloader');

      if (preloader) {

        preloader.classList.add('fade-out');

        setTimeout(function () {

          preloader.style.display = 'none';

        }, 350);
      }

      var spinner =
      document.getElementById('spinner');

      if (spinner) {

        spinner.classList.remove('show');
      }

    } catch (e) {

      console.error(e);
    }
  }

  function cleanupModalBackdrops() {

    try {

      document
      .querySelectorAll('.modal-backdrop')
      .forEach(function (b) {

        b.remove();
      });

      $('body')
      .removeClass('modal-open')
      .css('padding-right', '');

      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';

    } catch (e) {

      console.error(e);
    }
  }

  function escapeHtml(str) {

    return String(str || '')
    .replace(/[&<>"']/g, function (m) {

      return {

        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'

      }[m];
    });
  }

  function debounce(fn, wait) {

    let timeout;

    return function (...args) {

      clearTimeout(timeout);

      timeout = setTimeout(() => {

        fn.apply(this, args);

      }, wait);
    };
  }

  /* =========================================================
     CORE INIT
     ========================================================= */

  $(function () {

    setTimeout(hideSpinner, 10);

    /* WOW */
    if (window.WOW) {

      try {

        new WOW().init();

      } catch (e) {}
    }

    /* Sticky Navbar */
    $(window).on('scroll', function () {

      if ($(this).scrollTop() > 300) {

        $('.sticky-top')
        .addClass('shadow-sm')
        .css('top', '0px');

      } else {

        $('.sticky-top')
        .removeClass('shadow-sm')
        .css('top', '-100px');
      }
    });

    /* Back to top */
    $(window).on('scroll', function () {

      if ($(this).scrollTop() > 300) {

        $('.back-to-top').fadeIn('slow');

      } else {

        $('.back-to-top').fadeOut('slow');
      }
    });

    $('.back-to-top').on('click', function () {

      $('html, body').animate({

        scrollTop: 0

      }, 1200, 'easeInOutExpo');

      return false;
    });

    /* Counter */
    if ($.fn.counterUp) {

      $('[data-toggle="counter-up"]').counterUp({

        delay: 10,
        time: 2000
      });
    }

    /* Owl Carousel */
    if ($.fn.owlCarousel) {

      $(".header-carousel").owlCarousel({

        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
        nav: true,

        navText: [

          '<i class="bi bi-chevron-left"></i>',

          '<i class="bi bi-chevron-right"></i>'
        ]
      });

      $(".testimonial-carousel").owlCarousel({

        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav: true,

        responsive: {

          0: {
            items: 1
          },

          768: {
            items: 2
          }
        }
      });
    }
  });

  /* =========================================================
     DOCTORS PAGE
     ========================================================= */

  (function () {

    const $grid =
    $('#doctorsGrid');

    if (!$grid.length) return;

    /* =========================================================
       DOCTORS DATA
       ========================================================= */

    const doctorsData = [

      {
        id: 1,
        name: 'Dr. Abir Lal Nath',
        spec: 'Neurology',
        exp: 13,
        avail: 'Tue,Thu 10:00-17:00',
        fee: '₹800',
        img: 'img/doctos/Dr. Abir Lal Nath.jpg',
        address: 'Old Kalibari Rd, Agartala',
        contact: '+91-6909895655',
        email: 'example@example.com'
      },

      {
        id: 2,
        name: 'Dr. Arup Deb',
        spec: 'Cardiology',
        exp: 14,
        avail: 'Mon–Fri 09:00-15:00',
        fee: '₹700',
        img: 'img/doctos/Arup Deb.jpg',
        address: 'Cardio Care, Agartala',
        contact: '+91-9774488292',
        email: 'example@example.com'
      },

      {
        id: 3,
        name: 'Dr. Mukut Roy',
        spec: 'Endocrinologist',
        exp: 8,
        avail: 'Mon,Wed 10:00-15:00',
        fee: '₹650',
        img: 'img/doctos/Mukut Roy.jpg',
        address: 'Advisor Chowmuhani, Agartala',
        contact: '+91-6009012518',
        email: 'example@example.com'
      },

      {
        id: 4,
        name: 'Dr. Vikas Kohli',
        spec: 'Gastroenterologist',
        exp: 9,
        avail: 'Tue–Sat 10:00-14:00',
        fee: '₹400',
        img: 'img/doctos/Vikas Kohli.jpg',
        address: 'Dhaleswar, Agartala',
        contact: '+91-8119800887',
        email: 'example@example.com'
      },

      {
        id: 5,
        name: 'Dr. Nitish Das',
        spec: 'General Medicine',
        exp: 9,
        avail: 'Daily 08:00-20:00',
        fee: '₹300',
        img: 'img/doctos/Nitish Das.jpg',
        address: 'HGB Road, Agartala',
        contact: '+91-8415817011',
        email: 'example@example.com'
      },

      {
        id: 6,
        name: 'Dr. Abhijit Ray',
        spec: 'Ophthalmology',
        exp: 7,
        avail: 'Wed,Fri 09:00-15:00',
        fee: '₹500',
        img: 'img/doctos/abhijit ray.jpg',
        address: 'Palace Compound, Agartala',
        contact: '+91-N/A',
        email: 'example@example.com'
      },

      {
        id: 7,
        name: 'Dr. Nilanjan Majumdar',
        spec: 'Cardiology',
        exp: 12,
        avail: 'Tue–Sat 10:00-16:00',
        fee: '₹600',
        img: 'img/doctos/Nilanjan Majumdar.jpg',
        address: 'Indranagar, Agartala',
        contact: '+91-6909922076',
        email: 'example@example.com'
      },

      {
        id: 8,
        name: 'Dr. Amaresh Shil',
        spec: 'Orthopedics',
        exp: 10,
        avail: 'Mon,Wed,Fri 11:00-18:00',
        fee: '₹550',
        img: 'img/doctos/Amaresh shil.jpg',
        address: 'Bardowali, Agartala',
        contact: '+91-9862839530',
        email: 'example@example.com'
      }
    ];

    /* =========================================================
       STATE
       ========================================================= */

    let state = {

      search: '',
      spec: '',
      sort: 'name_asc'
    };

    /* =========================================================
       POPULATE SPECIALIZATION
       ========================================================= */

    function populateSpecSelect() {

      const $spec =
      $('#doctorSpec');

      if (!$spec.length) return;

      const specs = [

        ...new Set(
          doctorsData.map(d => d.spec)
        )

      ].sort();

      $spec.empty();

      $spec.append(
        '<option value="">All Specializations</option>'
      );

      specs.forEach(function (s) {

        $spec.append(

          '<option value="' +
          escapeHtml(s) +
          '">' +
          escapeHtml(s) +
          '</option>'
        );
      });
    }

    /* =========================================================
       FILTER
       ========================================================= */

    function getFiltered() {

      let arr =
      doctorsData.filter(function (d) {

        if (
          state.spec &&
          d.spec !== state.spec
        ) return false;

        if (state.search) {

          const hay =
          (
            d.name + ' ' +
            d.spec + ' ' +
            d.address
          ).toLowerCase();

          if (
            hay.indexOf(state.search) === -1
          ) return false;
        }

        return true;
      });

      /* SORT */

      if (state.sort === 'name_asc') {

        arr.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }

      if (state.sort === 'name_desc') {

        arr.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }

      if (state.sort === 'exp_desc') {

        arr.sort((a, b) =>
          b.exp - a.exp
        );
      }

      if (state.sort === 'exp_asc') {

        arr.sort((a, b) =>
          a.exp - b.exp
        );
      }

      return arr;
    }

    /* =========================================================
       RENDER GRID
       ========================================================= */

    function renderGrid() {

      $grid.empty();

      const items =
      getFiltered();

      if (!items.length) {

        $grid.append(

          '<div class="col-12">' +
          '<div class="bg-white p-4 rounded text-center">' +
          'No doctors found.' +
          '</div></div>'
        );

        return;
      }

      items.forEach(function (d) {

        const html =

          '<div class="col-lg-3 col-md-6">' +

          '<div class="team-item bg-light rounded overflow-hidden shadow-sm h-100">' +

          '<div class="overflow-hidden">' +

          '<img class="img-fluid" src="' +
          escapeHtml(d.img) +
          '" alt="' +
          escapeHtml(d.name) +
          '">' +

          '</div>' +

          '<div class="p-4 text-center">' +

          '<h5>' +
          escapeHtml(d.name) +
          '</h5>' +

          '<p class="text-primary">' +
          escapeHtml(d.spec) +
          '</p>' +

          '<p class="small text-muted">' +
          d.exp +
          ' Years Experience' +
          '</p>' +

          '<p class="small">' +
          escapeHtml(d.avail) +
          '</p>' +

          '<p class="fw-bold">' +
          escapeHtml(d.fee) +
          '</p>' +

          '<div class="d-flex justify-content-center gap-2">' +

          '<a href="apoinmnet.html?doctor_name=' +
          encodeURIComponent(d.name) +
          '&department=' +
          encodeURIComponent(d.spec) +
          '" class="btn btn-primary btn-sm">' +

          'Book Appointment' +

          '</a>' +

          '</div>' +

          '</div>' +

          '</div>' +

          '</div>';

        $grid.append(html);
      });
    }

    /* =========================================================
       CONTROLS
       ========================================================= */

    function bindControls() {

      $('#doctorSearch')
      .off('input')
      .on('input',

        debounce(function () {

          state.search =
          this.value.trim().toLowerCase();

          renderGrid();

        }, 300)
      );

      $('#doctorSpec')
      .off('change')
      .on('change', function () {

        state.spec = this.value;

        renderGrid();
      });

      $('#doctorSort')
      .off('change')
      .on('change', function () {

        state.sort = this.value;

        renderGrid();
      });
    }

    /* =========================================================
       MODAL CLEANUP
       ========================================================= */

    document.addEventListener(

      'hidden.bs.modal',

      function () {

        cleanupModalBackdrops();

      },

      false
    );

    /* =========================================================
       INIT
       ========================================================= */

    populateSpecSelect();

    bindControls();

    renderGrid();

  })();

})(jQuery);