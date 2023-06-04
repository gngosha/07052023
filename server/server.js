import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'



dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.post('/', async (req, res) => {
  try {
    const country_list = [
      "Австралия",
      "Австрия",
      "Азербайджан",
      "Албания",
      "Алжир",
      "Ангола",
      "Андорра",
      "Антигуа и Барбуда",
      "Аргентина",
      "Армения",
      "Афганистан",
      "Багамские Острова",
      "Бангладеш",
      "Барбадос",
      "Бахрейн",
      "Беларусь",
      "Белиз",
      "Бельгия",
      "Бенин",
      "Болгария",
      "Боливия",
      "Босния и Герцеговина",
      "Ботсвана",
      "Бразилия",
      "Бруней",
      "Буркина-Фасо",
      "Бурунди",
      "Бутан",
      "Вануату",
      "Великобритания",
      "Венгрия",
      "Венесуэла",
      "Восточный Тимор",
      "Вьетнам",
      "Габон",
      "Гаити",
      "Гайана",
      "Гамбия",
      "Гана",
      "Гватемала",
      "Гвинея",
      "Гвинея-Бисау",
      "Германия",
      "Гондурас",
      "Гренада",
      "Греция",
      "Грузия",
      "Дания",
      "Джибути",
      "Доминика",
      "Доминиканская Республика",
      "Египет",
      "Замбия",
      "Зимбабве",
      "Израиль",
      "Индия",
      "Индонезия",
      "Иордания",
      "Ирак",
      "Иран",
      "Ирландия",
      "Исландия",
      "Испания",
      "Италия",
      "Йемен",
      "Кабо-Верде",
      "Казахстан",
      "Камбоджа",
      "Камерун",
      "Канада",
      "Катар",
      "Кения",
      "Кипр",
      "Киргизия",
      "Кирибати",
      "Китай",
      "Колумбия",
      "Коморы",
      "Конго",
      "Демократическая Республика Конго",
      "Коста-Рика",
      "Кот-д'Ивуар",
      "Куба",
      "Кувейт",
      "Лаос",
      "Латвия",
      "Лесото",
      "Либерия",
      "Ливан",
    "Ливия",
    "Литва",
    "Лихтенштейн",
    "Люксембург",
    "Маврикий",
    "Мавритания",
    "Мадагаскар",
    "Македония",
    "Малави",
    "Малайзия",
    "Мали",
    "Мальдивы",
    "Мальта",
    "Марокко",
    "Мартиника",
    "Маршалловы Острова",
    "Мексика",
    "Микронезия",
    "Мозамбик",
    "Молдова",
    "Монако",
    "Монголия",
    "Мьянма",
    "Намибия",
    "Науру",
    "Непал",
    "Нигер",
    "Нигерия",
    "Нидерланды",
    "Никарагуа",
    "Ниуэ",
    "Новая Зеландия",
    "Новая Каледония",
    "Норвегия",
    "ОАЭ",
    "Оман",
    "Пакистан",
    "Палау",
    "Палестина",
    "Панама",
    "Папуа — Новая Гвинея",
    "Парагвай",
    "Перу",
    "Польша",
    "Португалия",
    "Пуэрто-Рико",
    "Южная Корея",
    "Реюньон",
    "Россия",
    "Руанда",
    "Румыния",
    "Сальвадор",
    "Самоа",
    "Сан-Марино",
    "Сан-Томе и Принсипи",
    "Саудовская Аравия",
    "Свазиленд",
    "Северная Корея",
    "Сейшелы",
    "Сенегал",
    "Сент-Винсент и Гренадины",
    "Сент-Китс и Невис",
    "Сент-Люсия",
    "Сербия",
    "Сингапур",
    "Сирия",
    "Словакия",
    "Словения",
    "Соломоновы Острова",
    "Сомали",
    "Судан",
    "Суринам",
    "США",
    "Сьерра-Леоне",
    "Таджикистан",
    "Таиланд",
    "Тайвань",
    "Танзания",
    "Того",
    "Тонга",
    "Тринидад и Тобаго",
    "Тувалу",
    "Тунис",
    "Туркменистан",
    "Турция",
    "Уганда",
    "Узбекистан",
    "Украина",
    "Уругвай",
    "Фиджи",
    "Филиппины",
    "Финляндия",
    "Франция",
    "Французская Гвиана",
    "Французская Полинезия",
    "Хорватия",
    "ЦАР",
    "Чад",
    "Черногория",
    "Чехия",
    "Чили",
    "Швейцария",
    "Швеция",
    "Шри-Ланка",
    "Эквадор",
    "Экваториальная Гвинея",
    "Эритрея",
    "Эсватини",
    "Эстония",
    "Эфиопия",
    "ЮАР",
    "Южный Судан",
    "Ямайка",
    "Япония"
    ];
    
    let country = country_list[Math.floor(Math.random()*country_list.length)];

    let prompt = `Ты должен загадать страну ${country} и описать её. Название страны - секрет. В своём ответе ты должен сделать следующее: Не говори названия страны ${country}; Скажи на каком контененте находится, размер (в точных цифрах), ИЧР(индекс человеческого развития) в цифрах, ВВП в цифрах, что чаще всего импортирует/экспортирует, Не говори названия страны, какие запасы нефти, газа, топлива, древесины; состоит ли в международных организациях по типу ООН, АТЭС и т.д. Не говори названия страны, Упомяни географические особенности, если такие есть.`;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0301",
      messages: [{ role: "user", content: prompt }],
    });

    res.status(200).send({
      bot: response.data.choices[0].message.content,
      message: country
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.get('/', async (req, res) => {
    res.status(200).send({
      message: 'Привет'
    })
  })


app.get('/', async (req, res) => {
    res.status(200).send({
      message: response.data.choices[0].message.content
    })
  })

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))

// export {country}