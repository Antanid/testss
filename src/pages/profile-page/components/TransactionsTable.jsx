export const TransactionsTable = ({ language }) => {
  const transactionsTableColumns = [
    {
      title: {
        ru: 'Время',
        en: 'Date',
      },
    },
    {
      title: {
        ru: 'Почта',
        en: 'Email',
      },
    },
    {
      title: {
        ru: 'Статус',
        en: 'Status',
      },
    },
    {
      title: {
        ru: 'Сумма',
        en: 'Amount',
      },
    },
    {
      title: {
        ru: 'ID',
        en: 'ID',
      },
    },
  ]

  const transactionsTableData = [
    {
      date: '01.06.2025',
      email: 'liestck@gmail.com',
      status: 'Full Back',
      earned: '15616',
    },
    {
      date: '01.06.2025',
      email: 'liestck@gmail.com',
      status: 'Full Back',
      earned: '15616',
    },
    {
      date: '01.06.2025',
      email: 'liestck@gmail.com',
      status: 'Full Back',
      earned: '15616',
    },
    {
      date: '01.06.2025',
      email: 'liestck@gmail.com',
      status: 'Full Back',
      earned: '15616',
    },
    {
      date: '01.06.2025',
      email: 'liestck@gmail.com',
      status: 'Full Back',
      earned: '15616',
    },
    {
      date: '01.06.2025',
      email: 'liestck@gmail.com',
      status: 'Full Back',
      earned: '15616',
    },
  ]

  return (
    <div className="container_default container__referals">
      <h4 className="text text_h4">
        {language === 'en' ? 'List of transactions' : 'Список транзакций'}
      </h4>
      <div className="referal__table">
        <div className="container_default referal__table__row">
          {transactionsTableColumns.map((column, index) => {
            return (
              <div className="referal__table__row__cell" key={index}>
                <p className="text text_p text_p_light">
                  {column.title[language] || column.title.ru}
                </p>
              </div>
            )
          })}
        </div>

        {transactionsTableData.map((referal, index) => {
          return (
            <div className="container_default referal__table__row" key={index}>
              <div className="referal__table__row__cell">
                <p className="text text_p">{referal.date}</p>
              </div>

              <div className="referal__table__row__cell">
                <p className="text text_p">{referal.email}</p>
              </div>

              <div className="referal__table__row__cell">
                <p className="text text_p">{referal.status}</p>
              </div>

              <div className="referal__table__row__cell">
                <p className="text text_p">{referal.earned}$</p>
              </div>

              <div className="referal__table__row__cell">
                <p className="text text_p">{index}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
