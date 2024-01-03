import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Player } from "@/types";
import { playerDefaultValues } from "@/constants";
import { playerFormSchema } from "@/lib/validator";
import Dropdown from "./Dropdown";
// import Dropdown from "./Dropdown"

type PlayerFormProps = {
  userId?: string;
  type: "Create" | "Update";
  player?: Player;
  playerId?: string;
};

const PlayerForm = ({ userId, type, player, playerId }: PlayerFormProps) => {
  //   const [files, setFiles] = useState<File[]>([]);
  const initialValues =
    player && type === "Update"
      ? {
          ...player,
        }
      : playerDefaultValues;

  //   const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof playerFormSchema>>({
    resolver: zodResolver(playerFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof playerFormSchema>) {
    // let uploadedImageUrl = values.imageUrl;

    // if (files.length > 0) {
    //   const uploadedImages = await startUpload(files);

    //   if (!uploadedImages) {
    //     return;
    //   }

    //   uploadedImageUrl = uploadedImages[0].url;
    console.log(values);
  }

  if (type === "Create") {
    //   try {
    //     const newEvent = await createEvent({
    //       event: { ...values, imageUrl: uploadedImageUrl },
    //       userId,
    //       path: "/profile",
    //     });
    //     if (newEvent) {
    //       form.reset();
    //       router.push(`/events/${newEvent._id}`);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
  }

  if (type === "Update") {
    //   if (!eventId) {
    //     router.back();
    //     return;
    //   }
    //   try {
    //     const updatedEvent = await updateEvent({
    //       userId,
    //       event: { ...values, imageUrl: uploadedImageUrl, _id: eventId },
    //       path: `/events/${eventId}`,
    //     });
    //     if (updatedEvent) {
    //       form.reset();
    //       router.push(`/events/${updatedEvent._id}`);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Player name"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nation_id"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="club"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Input
                    placeholder="Club"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Input
                      placeholder="Positions"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="goals"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                      className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? "Submitting..." : `${type} Player `}
        </Button>
      </form>
    </Form>
  );
};

export default PlayerForm;
