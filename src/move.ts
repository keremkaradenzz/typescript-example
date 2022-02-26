// Please update this type as same as with the data shape.

interface IFiles {
  id: string;
  name: string;
}
interface IList {
  id: string;
  name: string;
  files: IFiles[];
}

type List = IList[];

export default function move(list: List, source: string, destination: string): List {
  let backup: IFiles = { id: '', name: '' };

  list.map((item) => {
    item.files.forEach((file, index) => {
      if (file.id === source) {
        backup = file;
        item.files.splice(index, 1);
      } else if (file.id === destination) {
        throw new Error('You cannot specify a file as the destination');
      }
    });
    if (item.id === destination) {
      item.files.push(backup);
    } else if (item.id === source) {
      throw new Error('You cannot move a folder');
    }
    return item;
  });

  return list;
}
