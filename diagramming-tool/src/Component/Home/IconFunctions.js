
import { IoArrowUndo, IoArrowRedo } from 'react-icons/io5';
import { MdDeleteForever, MdFileOpen } from 'react-icons/md';
import { TfiSave } from 'react-icons/tfi';

export const iconComponents = {
  open: MdFileOpen,
  save: TfiSave,
  undo: IoArrowUndo,
  redo: IoArrowRedo,
  delete: MdDeleteForever,
};

export const iconTooltips = {
  open: 'Open',
  save: 'Save',
  undo: 'Undo',
  redo: 'Redo',
  delete: 'Delete',
};
