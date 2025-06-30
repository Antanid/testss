export const BlockTitle = ({ className, ref, language, Icons, ru, en, arrow }) => (
  <div className={className} ref={ref}>
    <div className="block_title_cont">
      <h2>
        <span>
          <Icons.Y2kStarIcon />
          {language === 'en' ? en : ru}
        </span>

        {arrow == undefined ? (
          arrow
        ) : (
          <div className="arrow_container">
            <Icons.ArrowLongIcon />
          </div>
        )}
      </h2>
    </div>
  </div>
)
