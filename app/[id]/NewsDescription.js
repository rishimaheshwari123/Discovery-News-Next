export const NewsDescription = ({ news }) => {
    console.log(news?.description); // Debugging line
    return (
      <span
        dangerouslySetInnerHTML={{ __html: news?.description || '' }}
      />
    );
  };
  