<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class OrderPlaced extends Mailable
{
    use Queueable, SerializesModels;

    public $order;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($order)
    {
        $this->order = $order;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $emailObject = $this->subject('Thank you for your order!')->view('emails.orderPlaced');
        if($this->order->hasDigitalItems === true) {
            foreach ($this->order->digitalAttachments as $key => $attachmentLink) {
                $emailObject->attachFromStorageDisk('s3', 'resources/generated-images/'.$attachmentLink);
            }
        }
        return $emailObject;
    }
}
