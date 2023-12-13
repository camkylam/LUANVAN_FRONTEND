export const formatDate = (value) => {
  const date = new Date(value);
  let day = date.getDate(), month = date.getMonth() + 1, year = date.getFullYear();
  if (month <= 2) month = `0${month}`;
  if (day < 10) day = `0${day}`;
  return `${day}/${month}/${year}`;
}

export const formatDateTime = (value) => {
  const date = new Date(value);
  let day = date.getDate(), month = date.getMonth() + 1, year = date.getFullYear(), hours = date.getHours(), minutes = date.getMinutes();
  if (month < 10) month = `0${month}`;
  if (day < 10) day = `0${day}`;
  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  return `${hours} giờ ${minutes} phút, ngày ${day}/${month}/${year}`;
}

export const formatDateTime_2 = (value) => {
  const start_time = value.split(" to ")[0];
  const end_time = value.split(" to ")[1];
  return [formatDateTime(start_time), formatDateTime(end_time)].join(" đến ");
}

export const searchData = (chooseSearch, items) => {
  switch (chooseSearch) {
    case "name":
      return items.map((value, index) => {
        return [value.name].join("").toLocaleLowerCase() || [value.PartyMember.name].join("").toLocaleLowerCase();
      });
    case "email":
      return items.map((value, index) => {
        return [value.email].join("").toLocaleLowerCase() || [value.PartyMember.email].join("").toLocaleLowerCase();
      });
    case "phone":
      return items.map((value, index) => {
        return [value.phone].join("").toLocaleLowerCase() || [value.PartyMember.phone].join("").toLocaleLowerCase();
      });
    case "partycell":
      return items.map((value, index) => {
        const partyCellName = value.PartyCell ? value.PartyCell.name : "";
        const partyMemberPartyCellName = value.PartyMember?.PartyCell?.name || "";
        return [partyCellName, partyMemberPartyCellName].join("").toLocaleLowerCase();
      });
    default:
      return items.map((value, index) => {
        return [value.name, value.email, value.phone]
          .join("")
          .toLocaleLowerCase();
      });
  }
};

export const updateItems = (items, searchData, searchText) => {
  return items.filter((value, index) => {
    return searchData.value[index].includes(
      searchText.toLocaleLowerCase()
    );
  });
}

//! check compute paginations
export const updateRows = (searchText, items, filter) => {
  if (!searchText)
    return {
      items,
      totalRow: items.length
    }
  else
    return {
      items: filter.value,
      totalRow: filter.value.length
    }
}

export const setNumberOfPages = (dataLength, entryValue) => {
  return Math.ceil(dataLength / entryValue);
}

export const setPagination = (data, totalPages, filtered) => {
  let items = []
  switch (data.itemType) {
    case 'members':
      items = data.members
      break
    case 'recommendations':
      items = data.recommendations
      break
    case 'accept':
      items = data.accept
      break
    case 'info':
        items = data.info
        break
    default:
      items = data.items
  }
 

  if (items?.length > 0) {
    if (totalPages.value == 0 || data.entryValue == "All") {
      data.entryValue = items.length;
      data.numberOfPages = 1;
    }
    else data.numberOfPages = totalPages.value;

    data.startRow = (data.currentPage - 1) * data.entryValue + 1;
    data.endRow = data.currentPage * data.entryValue;
    return filtered.value.filter((item, index) => {
      return (
        index + 1 > (data.currentPage - 1) * data.entryValue &&
        index + 1 <= data.currentPage * data.entryValue
      );
    })
  }
  else {
    data.startRow = 0;
    data.endRow = 0;
    data.totalRow = 0;
    data.numberOfPages = 1;
    return (items) ? items.value : [];
  }
}