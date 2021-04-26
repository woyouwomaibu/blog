export function useYearSort(pages) {
    const data = [];
    let year = 0;
    let num = -1;
    for (let index = 0; index < pages.length; index++) {
      const element = pages[index];
      const y = element.frontMatter.date.split("-")[0];
      if (y == year) {
        data[num].push(element);
      } else {
        num++;
        data[num] = [];
        data[num].push(element);
        year = y;
      }
    }
    return data;
  }

  export function initTags(pages) {
    const data = {
        all: []
    };
    for (let index = 0; index < pages.length; index++) {
      const element = pages[index];
      data.all.push(element)
      const tags = element.frontMatter.tags;
      tags && tags.forEach((item) => {
        if (data[item]) {
          data[item].push(element);
        } else {
          data[item] = [];
          data[item].push(element);
        }
      });
    }
    return data;
  }