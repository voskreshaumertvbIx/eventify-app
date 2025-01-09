"use client"
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import CreateEventModal from './create_event_modal';
import { useAtom } from 'jotai';
import { uiAtom } from '@/atoms/state';

const Overlays = () => {
  const [mountElement, setMountElement] = useState<HTMLElement | null>(null);
  const [ui]= useAtom(uiAtom);

  useEffect(() => {
    setMountElement(document.getElementById('overlays'));
  }, []);

  if (!mountElement) return null;

  return createPortal(<> {ui.modal && <CreateEventModal /> }</>, mountElement);
};

export default Overlays;
