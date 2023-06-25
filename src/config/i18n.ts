import { initReactI18next } from "react-i18next";

import i18n from "i18next";

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: "ru",
  resources: {
    ru: {
      translation: {
        indexPage: {
          home: "Главная",
          aboutUs: "О нас",
          services: "Услуги",
          blog: "Блог",
          contacts: "Контакты",
          welcome: "Добро пожаловать",
          information1: {
            title1: "Высокопрофессиональный клининг",
            title2: "Теперь уборка - это легко",
            title3: "Будь это дом или офис",
            welcomeText: `Добро пожаловать в Apart, вашу круглосуточную службу уборки! Наша квалифицированная и
увлеченная команда стремится обеспечить исключительную уборку
услуги, адаптированные к вашим уникальным потребностям.`,
            getAQuote: "Ознакомиться",
            trustedPartners: "Наши партнеры",
            trustedBrands: "Нам доверяют",
          },
          information2: {
            title1: "Уборка может быть легкой и быстрой",
            text1: `ApartX предлагает первоклассные чистящие средства для
жилая и коммерческая недвижимость. С нашей профессиональной командой
благодаря современному оборудованию мы обеспечиваем безупречную гигиену
окружающая среда.`,
            title2: "Компания, удостоенная наград",
            text2: `От регулярного технического обслуживания до глубокой очистки - мы предоставляем эффективные и надежные услуги, которые превосходят ожидания. Доверьте Apart все свои потребности в уборке и ощутите разницу в чистоте и свежести.`,
            ourServices: "Наши услуги",
          },
          calculatePrice: "Рассчитать стоимость",
          ourTeamOffers: {
            ourTeam: "Наша команда",
            offering: "Наша команда предлагает",
            services: {
              houseCleaning: "Уборка дома",
              officeCleaning: "Уборка офиса",
              floorCleaning: "Мытье пола",
              windowCleaning: "Мытье окон",
            },
            descriptions: {
              houseCleaning:
                "Наслаждайтесь безупречной чистотой в вашем доме благодаря нашей высококачественной уборке",
              officeCleaning: `Обеспечьте идеальную чистоту в офисе благодаря нашим высококачественным уборочным услугам.`,
              floorCleaning:
                "Позвольте нам превратить ваш пол в искрящуюся поверхность с помощью наших профессиональных услуг по мытью полов.",
              windowCleaning:
                "Дайте вашим окнам безупречный блеск с нашим профессиональным сервисом по мытью окон.",
            },
          },
          ourTeamMembers: {
            experts: "Наши эксперты",
          },
          portfolio: {
            title: "Наше портфолио",
            showcase: "Наши недавние работы",
            happyCustomers: "Довольных клиентов",
            teamMembers: "Участников команды",
            awardsWinning: "Наград получено",
            projectsComplete: "Проектов завершено",
          },
          sliderMembers: {
            windowCleaner: "Мойщик окон",
            windowCleanerDescription:
              "Он знает, как сделать ваши окна идеально чистыми",
            houseCleaner: "Уборщик дома",
            houseCleanerDescription: "Она знает, как сделать ваш дом чистым",
            commercialCleaner: "Коммерческий уборщик",
            commercialCleanerDescription:
              "Она знает, как сделать ваш офис чистым",
            floorCleaner: "Мойщик пола",
            floorCleanerDescription: "Он знает, как сделать ваш пол чистым",
            carpetCleaner: "Мойщик ковров",
            carpetCleanerDescription: "Он знает, как сделать ваш ковер чистым",
          },
          rooms: {
            1: "1-комнатная",
            2: "2-комнатная",
            3: "3-комнатная",
            4: "4-комнатная",
            5: "5-комнатная",
          },
          bathRooms: {
            1: "1 санузел",
            2: "2 санузла",
            3: "3 санузла",
            4: "4 санузла",
            5: "5 санузлов",
          },
          phonePlaceholder: "Номер телефона",
        },
        loginPage: {
          logIn: "Войти",
          passwordPlaceholder: "Пароль",
          forgotPassword: "Забыли пароль",
          dontHaveAccount: "Еще не зарегистрированы?",
          signUp: "Зарегистрироваться",
        },
        languagePopover: {
          currentLanguage: "Русский",
        },
        cleanerPage: {
          logOut: "Выйти",
          orders: "Заказы",
          moreDetails: "Подробнее",
        },
      },
    },
    en: {
      translation: {
        indexPage: {
          home: "Home",
          aboutUs: "About us",
          services: "Services",
          blog: "Blog",
          contacts: "Contacts",
          welcome: "Welcome",
          information1: {
            title1: "Highly prosessional cleaning",
            title2: "Easy to clean",
            title3: "House and office",
            welcomeText: `Welcome to ApartX, your go-to cleaning service! Our skilled and
              passionate team is dedicated to delivering exceptional cleaning
              services tailored to your unique needs.`,
            getAQuote: "Get a quote",
            trustedPartners: "Trusted partners",
            trustedBrands: "Brands who trust us",
          },
          information2: {
            title1: "Quickly and easily clean",
            text1: `ApartX offers top-notch cleaning solutions for
              residential and commercial properties. With our professional team
              and state-of-the-art equipment, we ensure a spotless and sanitary
              environment.`,
            title2: "Award-winning company",
            text2: `From regular maintenance to deep cleaning, we provide efficient and reliable services that exceed expectations. Trust ApartX for all your cleaning needs and experience the difference in cleanliness and freshness.`,
            ourServices: "Our services",
          },
          calculatePrice: "Calculate price",
          ourTeamOffers: {
            ourTeam: "Our team",
            offering: "Our team offers",
            services: {
              houseCleaning: "House cleaning",
              officeCleaning: "Office cleaning",
              floorCleaning: "Floor cleaning",
              windowCleaning: "Window cleaning",
            },
            descriptions: {
              houseCleaning:
                "Enjoy spotless cleanliness in your home thanks to our high-quality cleaning services.",
              officeCleaning: `Ensure perfect cleanliness in the office thanks to our high-quality cleaning services.`,
              floorCleaning:
                "Let us turn your floor into a sparkling surface with our professional floor cleaning services.",
              windowCleaning:
                "Give your windows a flawless shine with our professional window cleaning service.",
            },
          },
          ourTeamMembers: {
            experts: "Our expert team members",
          },
          portfolio: {
            title: "Our portfolio",
            showcase: "Our recent works",
            happyCustomers: "Happy customers",
            teamMembers: "Team members",
            awardsWinning: "Awards winning",
            projectsComplete: "Projects complete",
          },
          sliderMembers: {
            windowCleaner: "Window cleaner",
            windowCleanerDescription:
              "He knows how to make your windows perfectly clean",
            houseCleaner: "House cleaner",
            houseCleanerDescription: "She knows how to make your house clean",
            commercialCleaner: "Commercial cleaner",
            commercialCleanerDescription:
              "She knows how to make your office clean",
            floorCleaner: "Floor cleaner",
            floorCleanerDescription: "He knows how to make your floor clean",
            carpetCleaner: "Carpet cleaner",
            carpetCleanerDescription: "He knows how to make your carpet clean",
          },
          rooms: {
            1: "1 room",
            2: "2 rooms",
            3: "3 rooms",
            4: "4 rooms",
            5: "5 rooms",
          },
          bathRooms: {
            1: "1 bathroom",
            2: "2 bathrooms",
            3: "3 bathrooms",
            4: "4 batrooms",
            5: "5 bathrooms",
          },
          phonePlaceholder: "Phone number",
        },
        loginPage: {
          logIn: "Log in",
          passwordPlaceholder: "Password",
          forgotPassword: "I forgot my password",
          dontHaveAccount: "Don't have an account?",
          signUp: "Sign up",
        },
        languagePopover: {
          currentLanguage: "English",
        },
        cleanerPage: {
          logOut: "Log out",
          orders: "Orders",
          moreDetails: "More details",
        },
      },
    },
    kz: {
      translation: {
        indexPage: {
          home: "Бас парақша",
          aboutUs: "Біз туралы",
          services: "Қызметтер",
          blog: "Блог",
          contacts: "Байланыс деректері",
          welcome: "Қош келдіңіз",
          information1: {
            title1: "Жоғары кәсіби клининг",
            title2: "Енді тазалау оңай",
            title3: "Үй мен кеңсені қоса алғанда",
            welcomeText: `Apart, тәулік бойы тазалау қызметіне қош келдіңіз! Біздің білікті және
ынталы команда ерекше тазалауды қамтамасыз етуге тырысады
сіздің ерекше қажеттіліктеріңізге бейімделген қызметтер.`,
            getAQuote: "Толығырақ",
            trustedPartners: "Біздің серіктестер",
            trustedBrands: "Бізге сенетін брендтер",
          },
          information2: {
            title1: "Тазалау оңай және жылдам болуы мүмкін",
            text1: `ApartX бірінші дәрежелі тазалау құралдарын ұсынады
тұрғын үй және коммерциялық жылжымайтын мүлік. Біздің кәсіби командамен
заманауи жабдықтың арқасында біз мінсіз гигиенаны қамтамасыз етеміз
қоршаған орта.`,
            title2: "Марапаттарға лайықты компания",
            text2:
              "Тұрақты техникалық қызмет көрсетуден терең тазалауға дейін біз күткеннен асып түсетін тиімді және сенімді қызметтерді ұсынамыз. Барлық тазалау қажеттіліктеріңізді Apart-қа тапсырыңыз және тазалық пен балғындықтың айырмашылығын сезініңіз.",
            ourServices: "Біздің қызметтеріміз",
          },
          calculatePrice: "Бағасын есептеу",
          ourTeamOffers: {
            ourTeam: "Біздің команда",
            offering: "Ұсынған қызметтер",
            services: {
              houseCleaning: "Үй тазалау",
              officeCleaning: "Офис тазалау",
              floorCleaning: "Еден тазалау",
              windowCleaning: "Терезе тазалау",
            },
            descriptions: {
              houseCleaning:
                "Біздің жоғары сапалы тазалау қызметтеріміздің арқасында үйіңізде мінсіз тазалықтан ләззат алыңыз.",
              officeCleaning: `Біздің жоғары сапалы тазалау қызметтеріміздің арқасында кеңседе тамаша тазалықты қамтамасыз етіңіз.`,
              floorCleaning:
                "Кәсіби еден тазалау қызметтері арқылы еденіңізді жарқыраған бетке айналдыруға рұқсат етіңіз.",
              windowCleaning:
                "Біздің кәсіби терезе жуу қызметімізбен терезелеріңізге мінсіз жылтыр беріңіз.",
            },
          },
          ourTeamMembers: {
            experts: "Біздің эксперттеріміз",
          },
          portfolio: {
            title: "Портфолио",
            showcase: "Біздің соңғы жұмыстарымыз",
            happyCustomers: "Қуанышты клиенттер",
            teamMembers: "Команда мүшелері",
            awardsWinning: "Марапаттар алынған",
            projectsComplete: "Жобалар аяқталған",
          },
          sliderMembers: {
            windowCleaner: "Терезе тазалаушы",
            windowCleanerDescription: "Ол терезелеріңізді жылтыр беруді біледі",
            houseCleaner: "Үй тазалаушы",
            houseCleanerDescription: "Ол үйіңізді тазалауға біледі",
            commercialCleaner: "Коммерциялық тазалаушы",
            commercialCleanerDescription:
              "Ол коммерциялық клининг қызмет көрсетуді біледі",
            floorCleaner: "Еден тазалаушы",
            floorCleanerDescription: "Ол еденіңізді тазалауға біледі",
            carpetCleaner: "Кілем тазалаушы",
            carpetCleanerDescription: "Ол кілемді тазалауға біледі",
          },
          rooms: {
            1: "1 бөлме",
            2: "2 бөлме",
            3: "3 бөлме",
            4: "4 бөлме",
            5: "5 бөлме",
          },
          bathRooms: {
            1: "1 санитарлық торап",
            2: "2 санитарлық торап",
            3: "3 санитарлық торап",
            4: "4 санитарлық торап",
            5: "5 санитарлық торап",
          },
          phonePlaceholder: "Телефон нөміріңіз",
        },
        loginPage: {
          logIn: "Кіру",
          passwordPlaceholder: "Құпия сөз",
          forgotPassword: "Құпия сөзді ұмытып калдым",
          dontHaveAccount: "Әлі аккаунт жоқ па?",
          signUp: "Тіркелу",
        },

        languagePopover: {
          currentLanguage: "Қазақша",
        },
        cleanerPage: {
          logOut: "Аккаунттан Шығу",
          orders: "Тапсырыстар",
          moreDetails: "Толығырақ",
        },
      },
    },
  },
});

export default i18n;
